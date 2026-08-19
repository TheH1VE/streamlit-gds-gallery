"""Internal Streamlit Component v2 bridge."""

from __future__ import annotations

from collections.abc import Callable
from threading import local
from typing import Any

import streamlit as st
from streamlit.runtime.scriptrunner import get_script_run_ctx

from .models import serialize

_catalog: Any = None
_auto_key_state = local()
_missing_run = object()


def _next_auto_key(component: str) -> str:
    """Return a stable per-run key for an otherwise unkeyed catalogue element."""

    ctx = get_script_run_ctx(suppress_warning=True)
    run_cursors = ctx.cursors if ctx is not None else None
    if getattr(_auto_key_state, "run_cursors", _missing_run) is not run_cursors:
        _auto_key_state.run_cursors = run_cursors
        _auto_key_state.counts = {}

    counts: dict[str, int] = _auto_key_state.counts
    index = counts.get(component, 0)
    counts[component] = index + 1
    return f"streamlit-gds-auto-{component}-{index}"


def _get_catalog() -> Any:
    """Register lazily so models can be imported outside a Streamlit runtime."""

    global _catalog
    if _catalog is None:
        _catalog = st.components.v2.component(
            "streamlit-gds.catalog",
            html='<div class="st-gds-root"></div>',
            css="index-*.css",
            js="index-*.js",
            isolate_styles=False,
        )
    return _catalog


def mount(
    component: str,
    props: dict[str, Any],
    *,
    key: str | None = None,
    default: dict[str, Any] | None = None,
    callbacks: dict[str, Callable[..., Any] | None] | None = None,
) -> Any:
    """Mount a catalogue entry and register all of its state callbacks."""

    resolved_key = key if key is not None else _next_auto_key(component)

    callback_args: dict[str, Callable[..., Any]] = {}
    for name, callback in (callbacks or {}).items():
        callback_args[f"on_{name}_change"] = callback or (lambda: None)

    rendered_props = dict(props)
    # Component v2 state is stored as an object under the supplied key. Feed
    # current values back to the browser so controlled inputs survive reruns.
    if key and key in st.session_state:
        state = st.session_state[key]
        for state_name in default or {}:
            if hasattr(state, state_name):
                rendered_props[state_name] = getattr(state, state_name)
            elif isinstance(state, dict) and state_name in state:
                rendered_props[state_name] = state[state_name]
    rendered_props["_key"] = resolved_key

    catalog = _get_catalog()
    return catalog(
        data={"component": component, "props": serialize(rendered_props)},
        default=default or {},
        key=resolved_key,
        **callback_args,
    )


def result_value(result: Any, name: str, fallback: Any = None) -> Any:
    return getattr(result, name, fallback)
