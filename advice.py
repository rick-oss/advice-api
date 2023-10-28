from flask import Flask, render_template
import requests

app = Flask(__name__)


def get_advice():
    url = "https://api.adviceslip.com/advice"
    response = requests.get(url)

    mensagem = "Erro de requisiçao"

    if response.status_code == 200:
        data = response.json()
        advice = data["slip"]["advice"]

        return advice

    else:
        return mensagem


@app.route("/")
def index():
    advice = get_advice()
    return render_template("index.html", advice=advice)


if __name__ == "__main__":
    app.debug = True
    app.run()
