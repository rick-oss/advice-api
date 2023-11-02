from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

mensagem = "Erro de requisiçao"


def get_advice():
    # Faz uma requisiçao a API:
    url = "https://api.adviceslip.com/advice"
    response = requests.get(url)

    # Se a requisiçao for bem sucedida(código 200):
    if response.status_code == 200:
        data = response.json()
        conselho = data["slip"]["advice"]

        return conselho
    # Se a Requisiçao for mal sucedida:
    else:
        return mensagem


def translate_advice(conselho):
    # Passa o conselho gerado como um valor a ser traduzido:
    url = f"https://api.mymemory.translated.net/get?q={conselho}&langpair=en|pt"
    response = requests.get(url)

    # Se a requisiçao for bem sucedida(código 200):
    if response.status_code == 200:
        data = response.json()
        traduçao = data["responseData"]["translatedText"]

        return traduçao
    # Se a Requisiçao for mal sucedida:
    else:
        return mensagem


@app.route("/")
def index():
    # Gera o primeiro conselho:
    conselho = get_advice()
    return render_template("index.html", conselho=conselho)


@app.route("/NovoConselho", methods=["GET"])
def new_advice():
    # Gera e retorna o conselho em formato JSON:
    conselho = get_advice()

    return jsonify({"conselho": conselho})


@app.route("/TraduzirConselho", methods=["POST"])
def translated():
    # Recupera o conselho e traduz para português:
    conselho = request.form.get("advice")
    traduçao = translate_advice(conselho)

    # Retorna a traduçao em formato JSON:
    return jsonify({"traduçao": traduçao})


if __name__ == "__main__":
    app.run()
