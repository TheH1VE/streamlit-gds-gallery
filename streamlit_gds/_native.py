"""Native Streamlit delegates with lazy GDS host styling."""

from __future__ import annotations

from collections.abc import Callable
from contextlib import suppress
from functools import wraps
from inspect import signature
from typing import Any, ParamSpec, TypeVar, cast

import streamlit as st
from streamlit.errors import StreamlitDuplicateElementKey
from streamlit.runtime.scriptrunner import get_script_run_ctx

from ._runtime import mount

P = ParamSpec("P")
R = TypeVar("R")

_styled_context: int | None = None


def _context_id() -> int | None:
    context = get_script_run_ctx(suppress_warning=True)
    return id(context) if context is not None else None


def mark_theme_configured() -> None:
    """Record that ``configure`` already mounted the bootstrap this run."""

    global _styled_context
    _styled_context = _context_id()


def ensure_native_theme() -> None:
    """Install default host styles once for the current Streamlit script run."""

    global _styled_context
    context_id = _context_id()
    if context_id is None or context_id == _styled_context:
        return
    # Streamlit can replace its script context during a fragment-style
    # interaction while retaining the current element registry. The keyed
    # bootstrap is already present in that case, so no second mount is needed.
    with suppress(StreamlitDuplicateElementKey):
        mount(
            "bootstrap",
            {"service_name": "", "brand_colour": "#1d70b8", "chrome": "streamlit"},
            key="streamlit-gds-bootstrap",
        )
    _styled_context = context_id


def styled(delegate: Callable[P, R]) -> Callable[P, R]:
    """Preserve a native callable's signature while ensuring GDS styling."""

    @wraps(delegate)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        ensure_native_theme()
        return delegate(*args, **kwargs)

    # Streamlit exposes several bound DeltaGenerator methods with an unbound
    # ``__signature__`` attribute. Copy the already-bound public signature so
    # ``inspect.signature(gds.fn)`` exactly matches ``inspect.signature(st.fn)``.
    cast(Any, wrapper).__signature__ = signature(delegate)
    return wrapper


class LazyDeltaGenerator:
    """Activate styling before first use of a singleton Streamlit container."""

    def __init__(self, delegate: Any) -> None:
        self._delegate = delegate

    def __enter__(self) -> Any:
        ensure_native_theme()
        return self._delegate.__enter__()

    def __exit__(self, *args: Any) -> Any:
        return self._delegate.__exit__(*args)

    def __getattr__(self, name: str) -> Any:
        ensure_native_theme()
        return getattr(self._delegate, name)


# Text
write = styled(st.write)
markdown = styled(st.markdown)
title = styled(st.title)
header = styled(st.header)
subheader = styled(st.subheader)
caption = styled(st.caption)
text = styled(st.text)
code = styled(st.code)
latex = styled(st.latex)
divider = styled(st.divider)
badge = styled(st.badge)

# Buttons and inputs
button = styled(st.button)
download_button = styled(st.download_button)
form_submit_button = styled(st.form_submit_button)
link_button = styled(st.link_button)
menu_button = styled(st.menu_button)
page_link = styled(st.page_link)
checkbox = styled(st.checkbox)
toggle = styled(st.toggle)
radio = styled(st.radio)
selectbox = styled(st.selectbox)
multiselect = styled(st.multiselect)
pills = styled(st.pills)
segmented_control = styled(st.segmented_control)
select_slider = styled(st.select_slider)
number_input = styled(st.number_input)
slider = styled(st.slider)
date_input = styled(st.date_input)
datetime_input = styled(st.datetime_input)
time_input = styled(st.time_input)
text_input = styled(st.text_input)
text_area = styled(st.text_area)
file_uploader = styled(st.file_uploader)
color_picker = styled(st.color_picker)
feedback = styled(st.feedback)
audio_input = styled(st.audio_input)
camera_input = styled(st.camera_input)

# Data
metric = styled(st.metric)
table = styled(st.table)
dataframe = styled(st.dataframe)
data_editor = styled(st.data_editor)
json = styled(st.json)

# Layout and containers
form = styled(st.form)
container = styled(st.container)
columns = styled(st.columns)
tabs = styled(st.tabs)
expander = styled(st.expander)
popover = styled(st.popover)
dialog = styled(st.dialog)
empty = styled(st.empty)
space = styled(st.space)
sidebar = LazyDeltaGenerator(st.sidebar)
bottom = LazyDeltaGenerator(st.bottom)

# Status and chat
info = styled(st.info)
success = styled(st.success)
warning = styled(st.warning)
error = styled(st.error)
exception = styled(st.exception)
progress = styled(st.progress)
spinner = styled(st.spinner)
status = styled(st.status)
skeleton = styled(st.skeleton)
toast = styled(st.toast)
chat_input = styled(st.chat_input)
chat_message = styled(st.chat_message)
write_stream = styled(st.write_stream)

# Charts and media retain native rendering and receive only host-level styling.
area_chart = styled(st.area_chart)
bar_chart = styled(st.bar_chart)
line_chart = styled(st.line_chart)
scatter_chart = styled(st.scatter_chart)
map = styled(st.map)
pyplot = styled(st.pyplot)
altair_chart = styled(st.altair_chart)
vega_lite_chart = styled(st.vega_lite_chart)
plotly_chart = styled(st.plotly_chart)
pydeck_chart = styled(st.pydeck_chart)
graphviz_chart = styled(st.graphviz_chart)
mermaid_chart = styled(st.mermaid_chart)
image = styled(st.image)
audio = styled(st.audio)
video = styled(st.video)
pdf = styled(st.pdf)
logo = styled(st.logo)

# Common non-visual primitives are transparent aliases.
set_page_config = st.set_page_config
session_state = st.session_state
query_params = st.query_params
cache_data = st.cache_data
cache_resource = st.cache_resource
secrets = st.secrets
Page = st.Page
navigation = st.navigation
rerun = st.rerun
stop = st.stop
fragment = st.fragment
switch_page = st.switch_page


def passthrough(name: str) -> Any:
    """Return an unstyled Streamlit attribute outside the explicit surface."""

    return cast(Any, getattr(st, name))
