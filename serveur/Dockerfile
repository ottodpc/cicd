FROM node:22.8.0-alpine3.19 AS build
WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --chown=appuser:appgroup ./package.json ./yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines && \
    yarn cache clean 

COPY --chown=appuser:appgroup ./ .
RUN yarn build

FROM build AS production
WORKDIR /usr/src/app

COPY --chown=appuser:appgroup --from=build /usr/src/app/dist ./dist
COPY --chown=appuser:appgroup --from=build /usr/src/app/.env ./.env
COPY --chown=appuser:appgroup --from=build /usr/src/app/nest-cli.json ./nest-cli.json
COPY --chown=appuser:appgroup --from=build /usr/src/app/package.json ./package.json
COPY --chown=appuser:appgroup --from=build /usr/src/app/yarn.lock ./yarn.lock

ENV APP_HOST=0.0.0.0 \
    APP_API_PORT=4000 \
    NODE_ENV=production \
    TZ=UTC

RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

EXPOSE $APP_API_PORT
LABEL version="0.0.1" \
      description="Application server" \
      maintainer="OTTO cyprienotto@outlook.fr"

USER appuser

CMD ["node", "dist/main"]