# Upstream provenance

- Repository: https://github.com/TheH1VE/streamlit-GDS.git
- Commit: `57c902279a3c78a107adfb981f14d588e3a9d928`
- Upstream gallery entry point: `gallery/app.py`
- Standalone entry point: `app.py`

Vendored runtime files:

- `streamlit_gds/*.py`
- `streamlit_gds/py.typed`
- `streamlit_gds/pyproject.toml`
- `streamlit_gds/frontend/dist/*`

When updating from upstream, copy the files above together. The Python and
compiled frontend assets are versioned as one component and must stay in sync.
