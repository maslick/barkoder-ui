FROM node:12 as builder
LABEL stage=intermediate
COPY . /tmp
WORKDIR /tmp
RUN npm install && npm run build


FROM nginx:stable

RUN adduser www-data root
WORKDIR /var/www

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/site.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /tmp/build ./
COPY --from=builder /tmp/configure.sh ./
COPY --from=builder /tmp/docker/nginx.sh ./

RUN touch /var/run/nginx.pid && \
    chown -R www-data:root /var/run/nginx.pid && \
    chown -R www-data:root /var/cache/nginx && \
    chown -R www-data:root /var/www && \
    chmod -R 775 /var/run/nginx.pid && \
    chmod -R 775 /var/cache/nginx && \
    chmod -R 775 /var/www

USER www-data
CMD ./nginx.sh
