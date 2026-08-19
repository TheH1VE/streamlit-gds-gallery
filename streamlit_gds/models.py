"""Typed values shared by the public Streamlit GDS API."""

from __future__ import annotations

from dataclasses import dataclass, field, fields
from typing import Any, Generic, Literal, TypeVar, cast

T = TypeVar("T")


class Serializable:
    """Mixin for values sent through Streamlit's JSON component bridge."""

    def to_dict(self) -> dict[str, Any]:
        return {item.name: getattr(self, item.name) for item in fields(cast(Any, self))}


@dataclass(frozen=True)
class HtmlContent(Serializable):
    """Rich HTML sanitized again in the browser before it is rendered.

    Plain strings are always rendered as text. Constructing this type is the
    explicit opt-in for the small allow-list of rich markup supported by the
    frontend renderer.
    """

    html: str


ChatRole = Literal["assistant", "user"]


@dataclass(frozen=True)
class ChatMessage(Serializable):
    """A single, visibly attributed message in a chatbot transcript."""

    role: ChatRole
    content: str | HtmlContent
    name: str | None = None
    timestamp: str | None = None


@dataclass(frozen=True)
class Option(Serializable, Generic[T]):
    label: str
    value: T
    hint: str | None = None
    disabled: bool = False
    conditional: str | HtmlContent | None = None


@dataclass(frozen=True)
class Link(Serializable):
    label: str
    href: str
    external: bool = False


@dataclass(frozen=True)
class Breadcrumb(Serializable):
    label: str
    href: str | None = None


@dataclass(frozen=True)
class NavigationItem(Serializable):
    label: str
    href: str
    active: bool = False


@dataclass(frozen=True)
class PaginationItem(Serializable):
    label: str
    href: str
    current: bool = False


@dataclass(frozen=True)
class SummaryAction(Serializable):
    label: str
    href: str
    visually_hidden_text: str | None = None


@dataclass(frozen=True)
class SummaryRow(Serializable):
    key: str
    value: str | HtmlContent
    actions: tuple[SummaryAction, ...] = field(default_factory=tuple)


TaskStatus = Literal["not_started", "in_progress", "completed", "cannot_start", "optional"]


@dataclass(frozen=True)
class TaskItem(Serializable):
    title: str
    href: str | None = None
    status: TaskStatus = "not_started"
    hint: str | None = None


@dataclass(frozen=True)
class TableColumn(Serializable):
    key: str
    heading: str
    numeric: bool = False


@dataclass(frozen=True)
class ErrorItem(Serializable):
    text: str
    href: str


@dataclass(frozen=True)
class UploadedFileValue:
    name: str
    type: str
    size: int
    data: bytes


@dataclass(frozen=True)
class AccordionItem(Serializable):
    heading: str
    content: str | HtmlContent
    expanded: bool = False


@dataclass(frozen=True)
class TabItem(Serializable):
    label: str
    content: str | HtmlContent


@dataclass(frozen=True)
class CookieAction(Serializable):
    label: str
    value: str
    kind: Literal["button", "link"] = "button"
    href: str | None = None


def serialize(value: Any) -> Any:
    """Recursively convert public models into JSON-serialisable values."""

    if isinstance(value, Serializable):
        data = value.to_dict()
        if isinstance(value, HtmlContent):
            return {"__html__": data["html"]}
        return {key: serialize(item) for key, item in data.items()}
    if isinstance(value, tuple | list):
        return [serialize(item) for item in value]
    if isinstance(value, dict):
        return {str(key): serialize(item) for key, item in value.items()}
    return value
