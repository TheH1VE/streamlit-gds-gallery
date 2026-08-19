"""Page setup, layout, and core GOV.UK-inspired style helpers."""

from __future__ import annotations

import builtins
from collections.abc import Sequence
from typing import Literal

import streamlit as st
from streamlit.delta_generator import DeltaGenerator

from ._runtime import mount
from ._validation import colour as validate_colour
from .models import HtmlContent

Chrome = Literal["minimal", "streamlit"]
HeadingSize = Literal["xl", "l", "m", "s"]
Spacing = Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


def configure(
    *,
    page_title: str,
    service_name: str,
    brand_colour: str = "#1d70b8",
    chrome: Chrome = "minimal",
    page_icon: str | None = None,
    layout: Literal["centered", "wide"] = "centered",
) -> None:
    """Configure Streamlit and install the shared page-level style adapter.

    Call this before emitting other Streamlit elements.
    """

    if chrome not in {"minimal", "streamlit"}:
        raise ValueError("chrome must be 'minimal' or 'streamlit'")
    brand_colour = validate_colour(brand_colour)
    st.set_page_config(
        page_title=page_title,
        page_icon=page_icon,
        layout=layout,
        initial_sidebar_state="collapsed" if chrome == "minimal" else "auto",
    )
    mount(
        "bootstrap",
        {
            "service_name": service_name,
            "brand_colour": brand_colour,
            "chrome": chrome,
        },
        key="streamlit-gds-bootstrap",
    )
    # Avoid mounting the same keyed bootstrap again when a native-compatible
    # wrapper is called later in this script run.
    from ._native import mark_theme_configured

    mark_theme_configured()


def container(*, key: str, width: str = "full", border: bool = False) -> DeltaGenerator:
    """Return a keyed Streamlit container with a GDS grid width class."""

    allowed = {"full", "one-quarter", "one-third", "one-half", "two-thirds", "three-quarters"}
    if width not in allowed:
        raise ValueError(f"width must be one of {sorted(allowed)}")
    return st.container(key=f"gds-width-{width}-{key}", border=border)


def columns(
    spec: int | Sequence[int | float],
    *,
    gap: Literal["small", "medium", "large"] = "medium",
    vertical_alignment: Literal["top", "center", "bottom"] = "top",
) -> builtins.list[DeltaGenerator]:
    """Create responsive Streamlit columns with GDS-compatible gutters."""

    return st.columns(spec, gap=gap, vertical_alignment=vertical_alignment)


def space(size: Spacing = 4) -> None:
    """Insert one step from the GOV.UK spacing scale (5px per step)."""

    mount("space", {"size": size})


def heading(text: str, *, size: HeadingSize = "l", caption: str | None = None) -> None:
    mount("heading", {"text": text, "size": size, "caption": caption})


def paragraph(content: str | HtmlContent, *, lead: bool = False) -> None:
    mount("paragraph", {"content": content, "lead": lead})


def link(label: str, href: str, *, external: bool = False) -> None:
    mount("link", {"label": label, "href": href, "external": external})


def list_(
    items: Sequence[str],
    *,
    ordered: bool = False,
    bullet: bool = True,
) -> None:
    mount("list", {"items": builtins.list(items), "ordered": ordered, "bullet": bullet})


def image(src: str, *, alt: str, caption: str | None = None, width: int | None = None) -> None:
    if not alt.strip():
        raise ValueError(
            "image alt text must not be empty; use st.image directly for decorative images"
        )
    mount("image", {"src": src, "alt": alt, "caption": caption, "width": width})


def section_break(
    *,
    visible: bool = True,
    size: Literal[0, 1, 2, 3, 4, 5, 6] = 3,
    key: str | None = None,
) -> None:
    """Insert a divider with spacing from the GOV.UK 0-to-6 scale.

    Repeated section breaks are assigned distinct internal keys automatically.
    Supply ``key`` only when an explicit, stable identity is useful.
    """

    if isinstance(size, bool) or not isinstance(size, int) or size not in range(7):
        raise ValueError("size must be an integer from 0 to 6")
    mount("section_break", {"visible": visible, "size": size}, key=key)


# `list` is the documented public spelling. Keep the implementation name
# distinct so annotations can continue to use built-in collection terminology.
list = list_
