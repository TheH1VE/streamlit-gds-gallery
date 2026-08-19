"""Interactive catalogue for every Streamlit GDS component."""

from __future__ import annotations

from datetime import date

import streamlit_gds as gds

gds.configure(
    page_title="Streamlit GDS component gallery",
    service_name="Component gallery",
    chrome="streamlit",
    layout="wide",
)
gds.skip_link()
gds.catalogue.header(
    organisation="Example public service",
    service_name="Streamlit GDS",
    navigation=[
        gds.NavigationItem("Components", "#components", active=True),
        gds.NavigationItem("Accessibility", "#accessibility"),
    ],
)
gds.phase_banner("Alpha", "This library is being actively developed.")
gds.breadcrumbs(
    [gds.Breadcrumb("Home", "/"), gds.Breadcrumb("Component gallery")],
    collapse_on_mobile=True,
)
gds.heading("Component gallery", size="xl", caption="Streamlit GDS")
gds.paragraph(
    "All non-brand-restricted GOV.UK Design System components are represented below. "
    "The header and footer are neutral alternatives for non-GOV.UK services.",
    lead=True,
)

section = gds.sidebar.radio(
    "Catalogue section",
    ["Native API", "Forms", "Navigation", "Content", "Styles"],
    key="gallery-section",
)

if section == "Native API":
    gds.header("Native Streamlit compatibility")
    gds.write(
        "These components use Streamlit's native state, callbacks and return values. "
        "Only the import alias changes."
    )

    text_tab, inputs_tab, data_tab, layout_tab, status_tab = gds.tabs(
        ["Text and actions", "Inputs", "Data", "Layout", "Status and chat"],
        key="native-gallery-tabs",
    )
    with text_tab:
        gds.title("Application title")
        gds.header("Section heading")
        gds.subheader("Subsection heading")
        gds.markdown("Body text with a [service link](#native-gallery-tabs).")
        gds.caption("Supporting caption text")
        gds.text("Preformatted reference: AB-123")
        gds.code("result = gds.button('Continue')", language="python")
        gds.latex(r"x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}")
        gds.badge("In progress", color="blue")
        gds.divider()
        action_columns = gds.columns(3)
        action_columns[0].button("Primary action", type="primary", key="native-primary")
        action_columns[1].button("Secondary action", key="native-secondary")
        action_columns[2].link_button("Service guidance", "#native-gallery-tabs")
        gds.download_button(
            "Download native CSV",
            "reference,status\nA-123,Complete\n",
            "native-example.csv",
            mime="text/csv",
            key="native-download",
        )
        selected_export = gds.menu_button(
            "Export format", ["CSV", "JSON", "PDF"], key="native-menu"
        )
        gds.write("Selected export:", selected_export)

    with inputs_tab:
        native_name = gds.text_input("Full name", key="native-name", autocomplete="name")
        gds.write("Current value:", native_name or "None")
        gds.text_area("Additional information", key="native-text-area", max_chars=250)
        gds.number_input("Amount", min_value=0.0, step=1.0, key="native-number")
        gds.checkbox("I agree to the declaration", key="native-checkbox")
        gds.toggle("Send email updates", key="native-toggle")
        gds.radio("Contact method", ["Email", "Phone", "Post"], key="native-radio")
        gds.selectbox("Country", ["England", "Scotland", "Wales"], key="native-select")
        gds.multiselect(
            "Updates", ["Service updates", "Research invitations"], key="native-multiselect"
        )
        gds.pills("Priority", ["Routine", "Urgent"], key="native-pills")
        gds.segmented_control(
            "Case state", ["Open", "Closed", "All"], key="native-segmented"
        )
        gds.select_slider(
            "Confidence", ["Low", "Medium", "High"], value="Medium", key="native-select-slider"
        )
        gds.slider("Completion", 0, 100, 40, key="native-slider")
        gds.date_input("Appointment date", key="native-date")
        gds.datetime_input("Review date and time", key="native-datetime")
        gds.time_input("Preferred time", key="native-time")
        gds.file_uploader("Supporting file", key="native-file")
        gds.color_picker("Highlight colour", "#1d70b8", key="native-colour")
        gds.feedback("thumbs", key="native-feedback")
        gds.audio_input("Record a message", key="native-audio-input")
        gds.camera_input("Take a supporting photo", key="native-camera")

    with data_tab:
        metric_columns = gds.columns(3)
        metric_columns[0].metric("Applications", 1248, "+12%")
        metric_columns[1].metric("Decisions", 986, "+8%")
        metric_columns[2].metric("Overdue", 73, "+14")
        records = [
            {"Reference": "A-123", "Status": "Complete", "Days": 4},
            {"Reference": "B-456", "Status": "In progress", "Days": 9},
        ]
        gds.table(records)
        gds.dataframe(records, key="native-dataframe", hide_index=True)
        gds.data_editor(records, key="native-editor", num_rows="dynamic", hide_index=True)
        gds.json({"reference": "A-123", "status": "Complete"})
        chart_data = {"Received": [10, 14, 12, 18], "Completed": [8, 11, 13, 15]}
        chart_columns = gds.columns(2)
        chart_columns[0].line_chart(chart_data)
        chart_columns[1].bar_chart(chart_data)

    with layout_tab:
        with gds.container(border=True):
            gds.write("A native Streamlit container with GDS presentation.")
        left, right = gds.columns(2, border=True)
        left.write("Left column")
        right.write("Right column")
        with gds.expander("Show supporting information"):
            gds.write("Native expander state and keyboard behaviour are preserved.")
        with gds.popover("Open options"):
            gds.checkbox("Include closed cases", key="native-popover-checkbox")
        with gds.form("native-form", clear_on_submit=True):
            gds.text_input("Form reference", key="native-form-reference")
            gds.form_submit_button("Submit", type="primary")
        placeholder = gds.empty()
        placeholder.write("This content is rendered through a native placeholder.")
        gds.space("small")

    with status_tab:
        gds.info("Information message", title="Information")
        gds.success("The application was saved.", title="Success")
        gds.warning("Check the information before continuing.", title="Warning")
        gds.error("Enter a valid reference.", title="Error")
        gds.progress(65, text="Processing applications")
        with gds.status("Checks complete", state="complete", expanded=True):
            gds.write("Identity checked")
            gds.write("Evidence checked")
        with gds.spinner("Preparing results"):
            pass
        with gds.chat_message("assistant"):
            gds.write("How can I help with your application?")
        native_prompt = gds.chat_input("Ask a question", key="native-chat")
        if native_prompt:
            gds.toast("Message received", duration="short")

elif section == "Forms":
    gds.heading("Form controls", size="l")
    if gds.catalogue.button("Primary button", key="gallery-primary"):
        gds.notification_banner("Success", "The primary button was selected.", success=True)
    gds.catalogue.button("Secondary button", key="gallery-secondary", kind="secondary")
    gds.catalogue.button("Warning button", key="gallery-warning", kind="warning")
    gds.catalogue.button("Start now", key="gallery-start", kind="start")
    gds.catalogue.download_button(
        "Download example CSV",
        b"reference,status\nA-123,Complete\nB-456,In progress\n",
        "applications.csv",
        mime="text/csv",
        key="gallery-download",
        help="Downloads a CSV file containing example applications",
    )

    name = gds.catalogue.text_input(
        "Full name",
        key="gallery-name",
        hint="Enter your name as it appears on official documents",
        autocomplete="name",
        width="two-thirds",
    )
    gds.paragraph(f"Current value: {name or 'None'}")
    gds.catalogue.text_input(
        "Amount",
        key="gallery-amount",
        prefix="£",
        suffix="per month",
        width="one-third",
        input_type="number",
    )
    gds.password_input(
        "Password",
        key="gallery-password",
        hint="Use at least 10 characters",
        width="one-half",
        show_label="Enter",
    )
    gds.textarea("Additional information", key="gallery-textarea", rows=4)
    gds.character_count(
        "Describe the issue",
        key="gallery-count",
        max_characters=200,
        hint="Do not include personal information",
    )

    options = [
        gds.Option("Email", "email", hint="We will send a confirmation"),
        gds.Option("Phone", "phone", conditional="Calls are available Monday to Friday."),
        gds.Option("Post", "post"),
    ]
    gds.radios("How should we contact you?", options, key="gallery-radios")
    gds.checkboxes(
        "Which updates do you want?",
        [("Service updates", "service"), ("Research invitations", "research")],
        key="gallery-checkboxes",
    )
    gds.select("Country", [("England", "england"), ("Scotland", "scotland")], key="gallery-select")
    gds.catalogue.date_input(
        "Date of birth", key="gallery-date", value=date(1990, 1, 1), hint="For example, 31 3 1980"
    )
    gds.file_upload(
        "Upload supporting evidence",
        key="gallery-file",
        accept=[".pdf", ".png", ".jpg"],
        hint="PDF, PNG or JPG",
    )
    gds.fieldset("Contact details", "Use a phone number where we can reach you during the day.")
    gds.error_message("Enter a valid reference number")
    gds.error_summary(
        "There is a problem",
        [gds.ErrorItem("Enter your full name", "#st-gds-gallery-name-field")],
        focus=False,
    )

elif section == "Navigation":
    gds.heading("Navigation and page UI", size="l")
    gds.back_link()
    gds.service_navigation(
        [
            gds.NavigationItem("Overview", "#overview", active=True),
            gds.NavigationItem("Applications", "#applications"),
        ],
        service_name="Example service",
    )
    gds.accordion(
        [
            gds.AccordionItem("What you need", "Your reference number and contact details."),
            gds.AccordionItem("What happens next", "We will review your application."),
        ],
        key="gallery-accordion",
    )
    gds.catalogue.tabs(
        [gds.TabItem("Past day", "12 applications"), gds.TabItem("Past week", "81 applications")],
        key="gallery-tabs",
    )
    gds.pagination(
        [
            gds.PaginationItem("1", "#page-1", current=True),
            gds.PaginationItem("2", "#page-2"),
        ],
        previous=gds.Link("Previous", "#previous"),
        next=gds.Link("Next", "#next"),
    )
    action = gds.cookie_banner(
        "Cookies on this example service",
        "We use analytics cookies to understand how people use this service.",
        [
            gds.CookieAction("Accept analytics cookies", "accept"),
            gds.CookieAction("Reject analytics cookies", "reject"),
            gds.CookieAction("View cookies", "view", kind="link", href="#cookies"),
        ],
        key="gallery-cookie-banner",
    )
    if action:
        gds.paragraph(f"Cookie action: {action}")
    gds.exit_this_page(key="gallery-exit")

elif section == "Content":
    gds.heading("Content and status", size="l")
    gds.heading("Key performance indicators", size="m")
    gds.paragraph(
        "KPI cards are a Streamlit GDS extension, not an official GOV.UK Design System component. "
        "Optional RAG accents always include a written status so colour is not the only cue."
    )
    kpi_columns = gds.columns(3)
    with kpi_columns[0]:
        gds.kpi_card(
            "Applications received",
            "1,248",
            change="12%",
            trend="up",
            rag_status="green",
            comparison="from last month",
            supporting_text="Target: 1,200 applications",
        )
    with kpi_columns[1]:
        gds.kpi_card(
            "Decisions issued",
            986,
            change="8%",
            trend="up",
            rag_status="amber",
            comparison="from last month",
            supporting_text="Target: 1,000 decisions",
        )
    with kpi_columns[2]:
        gds.kpi_card(
            "Overdue cases",
            73,
            change=14,
            trend="up",
            rag_status="red",
            comparison="from last month",
            supporting_text="Target: fewer than 25 cases",
        )
    gds.heading("Chatbot", size="m")
    gds.paragraph(
        "The chatbot is a Streamlit GDS extension, not an official GOV.UK Design System "
        "component. Connect submitted messages to your own assistant service."
    )
    chat_history_key = "gallery-chat-history"
    if chat_history_key not in gds.session_state:
        gds.session_state[chat_history_key] = [
            gds.ChatMessage(
                "assistant",
                "Hello. I can help you understand your application status.",
                timestamp="10:30",
            )
        ]
    submitted_message = gds.chatbot(
        gds.session_state[chat_history_key],
        key="gallery-chatbot",
        label="Ask the service",
        hint="Do not include personal or financial information.",
        placeholder="Type your message",
    )
    if submitted_message:
        gds.session_state[chat_history_key].extend(
            [
                gds.ChatMessage("user", submitted_message, timestamp="Now"),
                gds.ChatMessage(
                    "assistant",
                    "Thanks. In a live service, your assistant backend would respond here.",
                    timestamp="Now",
                ),
            ]
        )
        gds.rerun()
    gds.details("Help with your reference number", "It is shown at the top of your letter.")
    gds.inset_text("It can take up to 10 working days to process an application.")
    gds.notification_banner("Important", "The service will be unavailable on Sunday.")
    gds.panel("Application complete", "Your reference number is HDJ2123F", variant="confirmation")
    gds.panel("Check before continuing", "This action cannot be undone.", variant="interruption")
    gds.summary_list(
        [
            gds.SummaryRow(
                "Name", "Taylor Example", (gds.SummaryAction("Change", "#name", "name"),)
            ),
            gds.SummaryRow("Contact", "taylor@example.com"),
        ],
        card_title="Applicant",
    )
    gds.catalogue.table(
        [gds.TableColumn("month", "Month"), gds.TableColumn("amount", "Amount", numeric=True)],
        [{"month": "January", "amount": "£120"}, {"month": "February", "amount": "£140"}],
        caption="Monthly totals",
    )
    colour_columns = gds.columns(3)
    for column, (label, colour) in zip(
        colour_columns,
        [("Completed", "green"), ("In progress", "blue"), ("Not started", "grey")],
        strict=True,
    ):
        with column:
            gds.tag(label, colour=colour)
    gds.task_list(
        [
            gds.TaskItem("Personal details", "#personal", "completed"),
            gds.TaskItem("Supporting evidence", "#evidence", "in_progress"),
            gds.TaskItem("Declaration", status="cannot_start"),
        ],
        title="Application tasks",
    )
    gds.warning_text("You can be fined if you provide false information.")

else:
    gds.heading("Core styles", size="l")
    for size in ("xl", "l", "m", "s"):
        gds.heading(f"Heading {size}", size=size)
    gds.paragraph("Lead paragraphs establish the purpose of a page.", lead=True)
    gds.paragraph("Body copy uses a readable system sans-serif stack.")
    gds.link("External guidance", "https://design-system.service.gov.uk/", external=True)
    gds.list(["A bulleted item", "Another bulleted item"])
    gds.list(["First step", "Second step"], ordered=True)
    gds.section_break(size=4)
    gds.catalogue.space(6)

gds.catalogue.footer(
    organisation="Example public service",
    text="This demonstration does not use GOV.UK branding.",
    links=[gds.Link("Accessibility", "#accessibility"), gds.Link("Privacy", "#privacy")],
)
