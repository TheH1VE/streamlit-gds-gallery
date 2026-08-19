"""Pythonic wrappers for the Streamlit GDS component catalogue."""

from __future__ import annotations

import base64
import mimetypes
from collections.abc import Callable, Mapping, Sequence
from datetime import date
from functools import partial
from pathlib import Path
from typing import Any, BinaryIO, Literal, TextIO, TypeVar, cast

import streamlit as st

from ._runtime import mount, result_value
from ._validation import normalise_options, required_key
from ._validation import width as validate_width
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
    SummaryRow,
    TabItem,
    TableColumn,
    TaskItem,
    UploadedFileValue,
)

T = TypeVar("T")
Callback = Callable[..., Any]
Content = str | HtmlContent
ButtonKind = Literal["primary", "secondary", "warning", "start"]
DownloadButtonKind = Literal["primary", "secondary"]
DownloadData = str | bytes | bytearray | memoryview | BinaryIO | TextIO
TextInputType = Literal["text", "number"]
KpiTrend = Literal["up", "down", "neutral"]
KpiRagStatus = Literal["red", "amber", "green"]
_COMMON_MIME_TYPES = {
    ".csv": "text/csv",
    ".html": "text/html",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".xml": "application/xml",
    ".zip": "application/zip",
}


def _callback(
    callback: Callback | None, args: tuple[Any, ...], kwargs: Mapping[str, Any] | None
) -> Callback | None:
    if callback is None:
        return None
    return partial(callback, *args, **dict(kwargs or {}))


def _input_props(
    label: str,
    *,
    hint: str | None,
    error: str | None,
    disabled: bool,
    required: bool,
    width: str,
) -> dict[str, Any]:
    return {
        "label": label,
        "hint": hint,
        "error": error,
        "disabled": disabled,
        "required": required,
        "width": validate_width(width),
    }


def button(
    label: str,
    *,
    key: str,
    kind: ButtonKind = "primary",
    disabled: bool = False,
    width: Literal["auto", "full"] = "auto",
    on_click: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> bool:
    if kind not in {"primary", "secondary", "warning", "start"}:
        raise ValueError("kind must be primary, secondary, warning, or start")
    result = mount(
        "button",
        {"label": label, "kind": kind, "disabled": disabled, "width": width},
        key=required_key(key, "button"),
        callbacks={"clicked": _callback(on_click, args, kwargs)},
    )
    return bool(result_value(result, "clicked", False))


def download_button(
    label: str,
    data: DownloadData,
    file_name: str | None = None,
    mime: str | None = None,
    *,
    key: str,
    kind: DownloadButtonKind = "secondary",
    disabled: bool = False,
    width: Literal["auto", "full"] = "auto",
    help: str | None = None,
    on_click: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> bool:
    """Render a GOV.UK-styled button that downloads text or binary data."""

    if kind not in {"primary", "secondary"}:
        raise ValueError("kind must be primary or secondary")

    source_name = getattr(data, "name", None)
    if isinstance(data, str):
        payload: str | bytes = data
    elif isinstance(data, bytes):
        payload = data
    elif isinstance(data, bytearray | memoryview):
        payload = bytes(data)
    else:
        payload = data.read()
        if not isinstance(payload, str | bytes):
            raise TypeError("file-like download data must return str or bytes from read()")

    if file_name is None:
        file_name = Path(source_name).name if isinstance(source_name, str) and source_name else None
    if file_name is None:
        file_name = "download.txt" if isinstance(payload, str) else "download.bin"
    if not file_name.strip() or "\x00" in file_name:
        raise ValueError("file_name must be a non-empty valid filename")

    if mime is None:
        guessed_mime, _ = mimetypes.guess_type(file_name)
        mime = _COMMON_MIME_TYPES.get(Path(file_name).suffix.lower()) or guessed_mime or (
            "text/plain; charset=utf-8"
            if isinstance(payload, str)
            else "application/octet-stream"
        )
    if not mime.strip():
        raise ValueError("mime must not be empty")

    if isinstance(payload, str):
        transported_data = payload
        encoding = "text"
    else:
        transported_data = base64.b64encode(payload).decode("ascii")
        encoding = "base64"

    result = mount(
        "download_button",
        {
            "label": label,
            "data": transported_data,
            "encoding": encoding,
            "file_name": file_name,
            "mime": mime,
            "kind": kind,
            "disabled": disabled,
            "width": width,
            "help": help,
        },
        key=required_key(key, "download_button"),
        callbacks={"clicked": _callback(on_click, args, kwargs)},
    )
    return bool(result_value(result, "clicked", False))


def text_input(
    label: str,
    *,
    key: str,
    value: str = "",
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    width: str = "full",
    prefix: str | None = None,
    suffix: str | None = None,
    autocomplete: str | None = None,
    inputmode: str | None = None,
    input_type: TextInputType = "text",
    on_change: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> str:
    if input_type not in {"text", "number"}:
        raise ValueError("input_type must be 'text' or 'number'")
    if input_type == "number" and inputmode is None:
        inputmode = "decimal"
    props = _input_props(
        label, hint=hint, error=error, disabled=disabled, required=required, width=width
    )
    props.update(
        value=value,
        prefix=prefix,
        suffix=suffix,
        autocomplete=autocomplete,
        inputmode=inputmode,
        input_type=input_type,
    )
    result = mount(
        "text_input",
        props,
        key=required_key(key, "text_input"),
        default={"value": value},
        callbacks={"value": _callback(on_change, args, kwargs)},
    )
    return str(result_value(result, "value", value) or "")


def textarea(
    label: str,
    *,
    key: str,
    value: str = "",
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    rows: int = 5,
    width: str = "full",
    on_change: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> str:
    if rows < 2:
        raise ValueError("rows must be at least 2")
    props = _input_props(
        label, hint=hint, error=error, disabled=disabled, required=required, width=width
    )
    props.update(value=value, rows=rows)
    result = mount(
        "textarea",
        props,
        key=required_key(key, "textarea"),
        default={"value": value},
        callbacks={"value": _callback(on_change, args, kwargs)},
    )
    return str(result_value(result, "value", value) or "")


def password_input(
    label: str,
    *,
    key: str,
    value: str = "",
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    width: str = "full",
    show_label: str = "Show",
    hide_label: str = "Hide",
    on_change: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> str:
    if not show_label.strip() or not hide_label.strip():
        raise ValueError("show_label and hide_label must not be empty")
    props = _input_props(
        label, hint=hint, error=error, disabled=disabled, required=required, width=width
    )
    props.update(value=value, show_label=show_label, hide_label=hide_label)
    result = mount(
        "password_input",
        props,
        key=required_key(key, "password_input"),
        default={"value": value, "visible": False},
        callbacks={
            "value": _callback(on_change, args, kwargs),
            "visible": None,
        },
    )
    return str(result_value(result, "value", value) or "")


def character_count(
    label: str,
    *,
    key: str,
    max_characters: int,
    value: str = "",
    hint: str | None = None,
    error: str | None = None,
    rows: int = 5,
    threshold: int = 75,
    on_change: Callback | None = None,
) -> str:
    if max_characters < 1:
        raise ValueError("max_characters must be positive")
    if not 0 <= threshold <= 100:
        raise ValueError("threshold must be between 0 and 100")
    result = mount(
        "character_count",
        {
            "label": label,
            "value": value,
            "hint": hint,
            "error": error,
            "rows": rows,
            "max_characters": max_characters,
            "threshold": threshold,
        },
        key=required_key(key, "character_count"),
        default={"value": value},
        callbacks={"value": on_change},
    )
    return str(result_value(result, "value", value) or "")


def select(
    label: str,
    options: Sequence[Option[T] | tuple[str, T]],
    *,
    key: str,
    value: T | None = None,
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    width: str = "full",
    on_change: Callback | None = None,
) -> T | None:
    choices = normalise_options(options)
    result = mount(
        "select",
        {
            **_input_props(
                label, hint=hint, error=error, disabled=disabled, required=required, width=width
            ),
            "options": choices,
            "value": value,
        },
        key=required_key(key, "select"),
        default={"value": value},
        callbacks={"value": on_change},
    )
    return cast(T | None, result_value(result, "value", value))


def radios(
    label: str,
    options: Sequence[Option[T] | tuple[str, T]],
    *,
    key: str,
    value: T | None = None,
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    inline: bool = False,
    on_change: Callback | None = None,
) -> T | None:
    choices = normalise_options(options)
    result = mount(
        "radios",
        {
            "label": label,
            "options": choices,
            "value": value,
            "hint": hint,
            "error": error,
            "disabled": disabled,
            "required": required,
            "inline": inline,
        },
        key=required_key(key, "radios"),
        default={"value": value},
        callbacks={"value": on_change},
    )
    return cast(T | None, result_value(result, "value", value))


def checkboxes(
    label: str,
    options: Sequence[Option[T] | tuple[str, T]],
    *,
    key: str,
    value: Sequence[T] = (),
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    small: bool = False,
    on_change: Callback | None = None,
) -> list[T]:
    choices = normalise_options(options)
    initial = list(value)
    result = mount(
        "checkboxes",
        {
            "label": label,
            "options": choices,
            "value": initial,
            "hint": hint,
            "error": error,
            "disabled": disabled,
            "required": required,
            "small": small,
        },
        key=required_key(key, "checkboxes"),
        default={"value": initial},
        callbacks={"value": on_change},
    )
    returned = result_value(result, "value", initial)
    return list(returned) if returned is not None else []


def date_input(
    label: str,
    *,
    key: str,
    value: date | None = None,
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    on_change: Callback | None = None,
) -> date | None:
    initial = value.isoformat() if value else None
    result = mount(
        "date_input",
        {
            "label": label,
            "value": initial,
            "hint": hint,
            "error": error,
            "disabled": disabled,
            "required": required,
        },
        key=required_key(key, "date_input"),
        default={"value": initial},
        callbacks={"value": on_change},
    )
    returned = result_value(result, "value", initial)
    try:
        return date.fromisoformat(returned) if returned else None
    except (TypeError, ValueError):
        return None


def file_upload(
    label: str,
    *,
    key: str,
    accept: Sequence[str] = (),
    hint: str | None = None,
    error: str | None = None,
    disabled: bool = False,
    required: bool = False,
    max_size_mb: int | None = None,
    on_change: Callback | None = None,
) -> UploadedFileValue | None:
    if max_size_mb is None:
        max_size_mb = int(st.get_option("server.maxUploadSize"))
    if max_size_mb < 1:
        raise ValueError("max_size_mb must be positive")
    result = mount(
        "file_upload",
        {
            "label": label,
            "accept": list(accept),
            "hint": hint,
            "error": error,
            "disabled": disabled,
            "required": required,
            "max_size_mb": max_size_mb,
        },
        key=required_key(key, "file_upload"),
        default={"file": None},
        callbacks={"file": on_change},
    )
    uploaded = result_value(result, "file")
    if not uploaded:
        return None
    raw = uploaded.get("data", b"")
    if isinstance(raw, list):
        raw = bytes(raw)
    return UploadedFileValue(
        name=str(uploaded["name"]),
        type=str(uploaded.get("type", "application/octet-stream")),
        size=int(uploaded["size"]),
        data=bytes(raw),
    )


def fieldset(legend: str, content: Content, *, heading_size: Literal["l", "m", "s"] = "m") -> None:
    mount("fieldset", {"legend": legend, "content": content, "heading_size": heading_size})


def error_message(text: str) -> None:
    mount("error_message", {"text": text})


def error_summary(
    title: str,
    errors: Sequence[ErrorItem],
    *,
    description: str | None = None,
    focus: bool = True,
) -> None:
    mount(
        "error_summary",
        {
            "title": title,
            "errors": list(errors),
            "description": description,
            "focus": focus,
        },
    )


def accordion(items: Sequence[AccordionItem], *, key: str, remember: bool = True) -> list[int]:
    result = mount(
        "accordion",
        {"items": list(items), "remember": remember},
        key=required_key(key, "accordion"),
        default={"open": [index for index, item in enumerate(items) if item.expanded]},
        callbacks={"open": None},
    )
    return list(result_value(result, "open", []))


def back_link(label: str = "Back", href: str = "#") -> None:
    mount("back_link", {"label": label, "href": href})


def breadcrumbs(items: Sequence[Breadcrumb], *, collapse_on_mobile: bool = False) -> None:
    mount("breadcrumbs", {"items": list(items), "collapse_on_mobile": collapse_on_mobile})


def cookie_banner(
    title: str,
    content: Content,
    actions: Sequence[CookieAction],
    *,
    key: str,
    hidden: bool = False,
) -> str | None:
    result = mount(
        "cookie_banner",
        {"title": title, "content": content, "actions": list(actions), "hidden": hidden},
        key=required_key(key, "cookie_banner"),
        callbacks={"action": None},
    )
    return cast(str | None, result_value(result, "action"))


def exit_this_page(
    *,
    href: str = "https://www.bbc.co.uk/weather",
    label: str = "Exit this page",
    key: str,
) -> bool:
    result = mount(
        "exit_this_page",
        {"href": href, "label": label},
        key=required_key(key, "exit_this_page"),
        callbacks={"exited": None},
    )
    return bool(result_value(result, "exited", False))


def header(
    *,
    organisation: str,
    service_name: str | None = None,
    home_url: str = "/",
    navigation: Sequence[NavigationItem] = (),
    brand_colour: str = "#1d70b8",
) -> None:
    mount(
        "header",
        {
            "organisation": organisation,
            "service_name": service_name,
            "home_url": home_url,
            "navigation": list(navigation),
            "brand_colour": brand_colour,
        },
    )


def footer(
    *, links: Sequence[Link] = (), organisation: str | None = None, text: str | None = None
) -> None:
    mount("footer", {"links": list(links), "organisation": organisation, "text": text})


def notification_banner(
    title: str,
    content: Content,
    *,
    success: bool = False,
    role: Literal["region", "alert"] = "region",
) -> None:
    mount(
        "notification_banner",
        {"title": title, "content": content, "success": success, "role": role},
    )


def pagination(
    items: Sequence[PaginationItem] = (),
    *,
    previous: Link | None = None,
    next: Link | None = None,
) -> None:
    mount("pagination", {"items": list(items), "previous": previous, "next": next})


def phase_banner(phase: str, content: Content) -> None:
    mount("phase_banner", {"phase": phase, "content": content})


def service_navigation(
    items: Sequence[NavigationItem],
    *,
    service_name: str | None = None,
    service_url: str = "/",
) -> None:
    mount(
        "service_navigation",
        {"items": list(items), "service_name": service_name, "service_url": service_url},
    )


def skip_link(label: str = "Skip to main content", href: str = "#main-content") -> None:
    mount("skip_link", {"label": label, "href": href})


def tabs(items: Sequence[TabItem], *, key: str, selected: int = 0) -> int:
    if not items:
        raise ValueError("tabs requires at least one item")
    if not 0 <= selected < len(items):
        raise ValueError("selected tab index is out of range")
    result = mount(
        "tabs",
        {"items": list(items), "selected": selected},
        key=required_key(key, "tabs"),
        default={"selected": selected},
        callbacks={"selected": None},
    )
    return int(result_value(result, "selected", selected))


def details(summary: str, content: Content, *, open: bool = False) -> None:
    mount("details", {"summary": summary, "content": content, "open": open})


def inset_text(content: Content) -> None:
    mount("inset_text", {"content": content})


def panel(
    title: str,
    content: Content | None = None,
    *,
    variant: Literal["confirmation", "interruption"] = "confirmation",
) -> None:
    mount("panel", {"title": title, "content": content, "variant": variant})


def kpi_card(
    label: str,
    value: str | int | float,
    *,
    change: str | int | float | None = None,
    trend: KpiTrend = "neutral",
    rag_status: KpiRagStatus | None = None,
    comparison: str | None = None,
    supporting_text: str | None = None,
) -> None:
    """Display a prominent key performance indicator.

    This is a Streamlit GDS extension rather than an official GOV.UK Design
    System component. ``trend`` describes direction only; it does not imply
    that an increase is good or a decrease is bad. ``rag_status`` adds a
    written red, amber, or green status as well as a colour accent.
    """

    if not label.strip():
        raise ValueError("KPI card label must not be empty")
    if trend not in {"up", "down", "neutral"}:
        raise ValueError("trend must be 'up', 'down', or 'neutral'")
    if rag_status not in {None, "red", "amber", "green"}:
        raise ValueError("rag_status must be 'red', 'amber', 'green', or None")
    mount(
        "kpi_card",
        {
            "label": label,
            "value": value,
            "change": change,
            "trend": trend,
            "rag_status": rag_status,
            "comparison": comparison,
            "supporting_text": supporting_text,
        },
    )


def chatbot(
    messages: Sequence[ChatMessage],
    *,
    key: str,
    label: str = "Chat support",
    input_label: str = "Your message",
    hint: str | None = None,
    error: str | None = None,
    placeholder: str | None = None,
    send_label: str = "Send",
    assistant_name: str = "Service assistant",
    user_name: str = "You",
    waiting: bool = False,
    disabled: bool = False,
    empty_text: str = "No messages yet.",
    on_submit: Callback | None = None,
    args: tuple[Any, ...] = (),
    kwargs: Mapping[str, Any] | None = None,
) -> str | None:
    """Render an accessible conversational interface and return a submitted message.

    This is a Streamlit GDS extension, not an official GOV.UK Design System
    component. It provides the presentation and input controls only; callers
    remain responsible for their assistant backend and conversation history.
    """

    for field_name, field_value in {
        "label": label,
        "input_label": input_label,
        "send_label": send_label,
        "assistant_name": assistant_name,
        "user_name": user_name,
    }.items():
        if not field_value.strip():
            raise ValueError(f"chatbot {field_name} must not be empty")
    for message in messages:
        if message.role not in {"assistant", "user"}:
            raise ValueError("chat message role must be 'assistant' or 'user'")

    result = mount(
        "chatbot",
        {
            "messages": list(messages),
            "label": label,
            "input_label": input_label,
            "hint": hint,
            "error": error,
            "placeholder": placeholder,
            "send_label": send_label,
            "assistant_name": assistant_name,
            "user_name": user_name,
            "waiting": waiting,
            "disabled": disabled,
            "empty_text": empty_text,
        },
        key=required_key(key, "chatbot"),
        default={"draft": ""},
        callbacks={"draft": None, "submitted": _callback(on_submit, args, kwargs)},
    )
    submitted = result_value(result, "submitted")
    return str(submitted) if submitted is not None else None


def summary_list(rows: Sequence[SummaryRow], *, card_title: str | None = None) -> None:
    mount("summary_list", {"rows": list(rows), "card_title": card_title})


def table(
    columns: Sequence[TableColumn],
    rows: Sequence[Mapping[str, Any]],
    *,
    caption: str | None = None,
    responsive: bool = True,
) -> None:
    mount(
        "table",
        {
            "columns": list(columns),
            "rows": list(rows),
            "caption": caption,
            "responsive": responsive,
        },
    )


def tag(text: str, *, colour: str = "blue") -> None:
    allowed = {"grey", "green", "turquoise", "blue", "purple", "pink", "red", "orange", "yellow"}
    if colour not in allowed:
        raise ValueError(f"tag colour must be one of {sorted(allowed)}")
    mount("tag", {"text": text, "colour": colour})


def task_list(items: Sequence[TaskItem], *, title: str | None = None) -> None:
    mount("task_list", {"items": list(items), "title": title})


def warning_text(text: str, *, icon_fallback: str = "Warning") -> None:
    mount("warning_text", {"text": text, "icon_fallback": icon_fallback})
