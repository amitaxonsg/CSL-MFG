FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node package.json server.mjs ./
COPY --chown=node:node lib ./lib
COPY --chown=node:node public ./public
COPY --chown=node:node scripts ./scripts
RUN mkdir /data && chown node:node /data
ENV HOST=0.0.0.0 PORT=3000 DATA_DIR=/data
USER node
EXPOSE 3000
VOLUME /data
CMD ["node", "server.mjs"]
