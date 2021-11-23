FROM amd64/golang
RUN mkdir /pti
RUN mkdir /pti/src
RUN mkdir /pti/http
ADD . /pti/http
WORKDIR /pti/http/src
RUN go build -o bin main.go
EXPOSE 8080
CMD [ "./bin" ]
