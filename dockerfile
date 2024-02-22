FROM golang:1.21.0 AS builder

WORKDIR /app

RUN mkdir -p /bin

RUN mkdir -p /pkg

RUN GOPATH=/app go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest

# Change Image
FROM node:20.8.0

WORKDIR /app

COPY --from=builder /app/bin/interactsh-client /app/bin/interactsh-client

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]