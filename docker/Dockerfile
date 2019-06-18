FROM node:8 as builder
LABEL stage=intermediate
COPY . /tmp
WORKDIR /tmp
RUN npm install && npm run build

FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /tmp/build ./
COPY --from=builder /tmp/configure.sh ./
COPY --from=builder /tmp/docker/nginx.sh ./
RUN chmod +x configure.sh
RUN chmod +x nginx.sh

USER 1000
CMD ./nginx.sh
