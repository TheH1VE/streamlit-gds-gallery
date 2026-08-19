"""GDS-styled native Streamlit API and exact catalogue components."""

# ruff: noqa: F401

from __future__ import annotations

import builtins
from typing import Any

from . import catalogue
from ._native import (
    Page,
    altair_chart,
    area_chart,
    audio,
    audio_input,
    badge,
    bar_chart,
    bottom,
    button,
    cache_data,
    cache_resource,
    camera_input,
    caption,
    chat_input,
    chat_message,
    checkbox,
    code,
    color_picker,
    columns,
    container,
    data_editor,
    dataframe,
    date_input,
    datetime_input,
    dialog,
    divider,
    download_button,
    empty,
    error,
    exception,
    expander,
    feedback,
    file_uploader,
    form,
    form_submit_button,
    fragment,
    graphviz_chart,
    header,
    image,
    info,
    json,
    latex,
    line_chart,
    link_button,
    logo,
    map,
    markdown,
    menu_button,
    mermaid_chart,
    metric,
    multiselect,
    navigation,
    number_input,
    page_link,
    passthrough,
    pdf,
    pills,
    plotly_chart,
    popover,
    progress,
    pydeck_chart,
    pyplot,
    query_params,
    radio,
    rerun,
    scatter_chart,
    secrets,
    segmented_control,
    select_slider,
    selectbox,
    session_state,
    set_page_config,
    sidebar,
    skeleton,
    slider,
    space,
    spinner,
    status,
    stop,
    subheader,
    success,
    switch_page,
    table,
    tabs,
    text,
    text_area,
    text_input,
    time_input,
    title,
    toast,
    toggle,
    vega_lite_chart,
    video,
    warning,
    write,
    write_stream,
)
from .catalogue import (
    accordion,
    back_link,
    breadcrumbs,
    character_count,
    chatbot,
    checkboxes,
    cookie_banner,
    details,
    error_message,
    error_summary,
    exit_this_page,
    fieldset,
    file_upload,
    footer,
    heading,
    inset_text,
    kpi_card,
    link,
    list,
    notification_banner,
    pagination,
    panel,
    paragraph,
    password_input,
    phase_banner,
    radios,
    section_break,
    select,
    service_navigation,
    skip_link,
    summary_list,
    tag,
    task_list,
    textarea,
    warning_text,
)
from .models import (
    AccordionItem,
    Breadcrumb,
    ChatMessage,
    CookieAction,
    ErrorItem,
    HtmlContent,
    Link,
    NavigationItem,
    Option,
    PaginationItem,
    SummaryAction,
    SummaryRow,
    TabItem,
    TableColumn,
    TaskItem,
    UploadedFileValue,
)
from .styles import configure

_NATIVE_EXPORTS = [
    "Page", "altair_chart", "area_chart", "audio", "audio_input", "badge",
    "bar_chart", "bottom", "button", "cache_data", "cache_resource", "camera_input",
    "caption", "chat_input", "chat_message", "checkbox", "code", "color_picker",
    "columns", "container", "data_editor", "dataframe", "date_input", "datetime_input",
    "dialog", "divider", "download_button", "empty", "error", "exception", "expander",
    "feedback", "file_uploader", "form", "form_submit_button", "fragment",
    "graphviz_chart", "header", "image", "info", "json", "latex", "line_chart",
    "link_button", "logo", "map", "markdown", "menu_button", "mermaid_chart", "metric",
    "multiselect", "navigation", "number_input", "page_link", "pdf", "pills",
    "plotly_chart", "popover", "progress", "pydeck_chart", "pyplot", "query_params",
    "radio", "rerun", "scatter_chart", "secrets", "segmented_control", "select_slider",
    "selectbox", "session_state", "set_page_config", "sidebar", "skeleton", "slider",
    "space", "spinner", "status", "stop", "subheader", "success", "switch_page", "table",
    "tabs", "text", "text_area", "text_input", "time_input", "title", "toast", "toggle",
    "vega_lite_chart", "video", "warning", "write", "write_stream",
]

_CATALOGUE_EXPORTS = [
    "accordion", "back_link", "breadcrumbs", "character_count", "chatbot", "checkboxes",
    "cookie_banner", "details", "error_message", "error_summary", "exit_this_page", "fieldset",
    "file_upload", "footer", "heading", "inset_text", "kpi_card", "link", "list",
    "notification_banner", "pagination", "panel", "paragraph", "password_input",
    "phase_banner", "radios", "section_break", "select", "service_navigation", "skip_link",
    "summary_list", "tag", "task_list", "textarea", "warning_text",
]

_MODEL_EXPORTS = [
    "AccordionItem", "Breadcrumb", "ChatMessage", "CookieAction", "ErrorItem", "HtmlContent",
    "Link", "NavigationItem", "Option", "PaginationItem", "SummaryAction", "SummaryRow",
    "TabItem", "TableColumn", "TaskItem", "UploadedFileValue",
]

__all__ = sorted(
    _NATIVE_EXPORTS + _CATALOGUE_EXPORTS + _MODEL_EXPORTS + ["catalogue", "configure"]
)

__version__ = "0.2.0"


def __getattr__(name: str) -> Any:
    """Forward APIs outside the styled surface to Streamlit unchanged."""

    try:
        return passthrough(name)
    except AttributeError as exc:
        raise AttributeError(f"module 'streamlit_gds' has no attribute {name!r}") from exc


def __dir__() -> builtins.list[str]:
    import streamlit as st

    return sorted(set(globals()) | set(dir(st)))
