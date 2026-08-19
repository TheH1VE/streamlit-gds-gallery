"""Exact GOV.UK Design System catalogue components.

This namespace preserves the component APIs shipped before version 0.2. Native-
compatible Streamlit functions live at the package top level.
"""

from .components import (
    accordion,
    back_link,
    breadcrumbs,
    button,
    character_count,
    chatbot,
    checkboxes,
    cookie_banner,
    date_input,
    details,
    download_button,
    error_message,
    error_summary,
    exit_this_page,
    fieldset,
    file_upload,
    footer,
    header,
    inset_text,
    kpi_card,
    notification_banner,
    pagination,
    panel,
    password_input,
    phase_banner,
    radios,
    select,
    service_navigation,
    skip_link,
    summary_list,
    table,
    tabs,
    tag,
    task_list,
    text_input,
    textarea,
    warning_text,
)
from .styles import (
    columns,
    container,
    heading,
    image,
    link,
    list,
    paragraph,
    section_break,
    space,
)

__all__ = [
    "accordion", "back_link", "breadcrumbs", "button", "character_count", "chatbot",
    "checkboxes", "columns", "container", "cookie_banner", "date_input", "details",
    "download_button", "error_message", "error_summary", "exit_this_page", "fieldset",
    "file_upload", "footer", "header", "heading", "image", "inset_text", "kpi_card",
    "link", "list", "notification_banner", "pagination", "panel", "paragraph",
    "password_input", "phase_banner", "radios", "section_break", "select",
    "service_navigation", "skip_link", "space", "summary_list", "table", "tabs", "tag",
    "task_list", "text_input", "textarea", "warning_text",
]
