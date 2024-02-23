# Interactsh Wrapper
A simple wrapper for the Interactsh API. It only has the `/getURL` and `/getInteractions` implemented.

## Installation

First clone the repository:

```bash
git clone https://github.com/bartick/interactsh-wrapper
```

## Manual Installation

Second make sure you have go1.20+ installed. Then run the following command:

```bash
go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest
```

now install dependencies:

```bash
node install
```

now you can run the server:

```bash
npm run start
```

## Docker Installation

```bash
docker build -t interactsh-wrapper .
docker run -p 3000:3000 interactsh-wrapper
```
you can change port forwarding to any port you want.

## Usage

```bash
curl -X GET "http://localhost:3000/getURL"
# OUTPUT: cnbgnj4afrus7a3tei108ppuspccfifwo.oast.online

curl -X GET cnbgnj4afrus7a3tei108ppuspccfifwo.oast.online
# OUTPUT: <html><head></head><body>owfifccpsupp801iet3a7surfa4jngbnc</body></html>

curl -X GET "http://localhost:3000/getInteractions"
# [{"message":"[cnbgnj4afrus7a3tei108ppuspccfifwo] Received HTTP interaction from 127.0.0.1 at 2024-02-22 08:55:01","ip":"127.0.0.1","date":"2024-02-22T08:55:01.000Z"}]%  
```

### Get Interactions

```bash
curl -X GET "http://localhost:3000/getInteractions?url=https://example.com" -H "accept: application/json"
```

Working Video: [https://youtu.be/k_wpxcz9eRg](https://youtu.be/k_wpxcz9eRg).