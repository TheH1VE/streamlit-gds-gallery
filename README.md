# Streamlit GDS Component Gallery

Standalone deployment of the Streamlit GDS component gallery, prepared for
Posit Connect. The Streamlit entry point is [`app.py`](app.py).

The `streamlit_gds` package and its compiled browser assets are vendored in
this repository, so a deployment does not need access to the upstream source
repository or a Node.js build step.

## Run locally

Requires Python 3.10 or later.

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m streamlit run app.py
```

## Deploy to Posit Connect from GitHub

1. Push this repository to GitHub.
2. In Posit Connect, create new content from the Git repository.
3. Select `app.py` as the primary Streamlit file if Connect asks for one.
4. Deploy from the `main` branch.

Posit Connect installs the vendored component package and pinned Streamlit
runtime from `requirements.txt`. Installing the local package is required so
Streamlit can register the compiled component assets declared in
`pyproject.toml`. No secrets or environment variables are required.

## Upstream source

The gallery and vendored package were copied from
[`TheH1VE/streamlit-GDS`](https://github.com/TheH1VE/streamlit-GDS) at commit
`57c902279a3c78a107adfb981f14d588e3a9d928`.

The upstream project is MIT licensed. See [`LICENSE`](LICENSE).
