FROM php:8.3-fpm-alpine

# Environments
ENV TZ=Europe/Paris
ENV WORKDIR=/var/www/app.dev

# Updates and installs system dependencies
RUN apk add --update --no-cache \
  bash \
  tzdata \
  libxml2-dev \
  libpng-dev \
  libjpeg-turbo-dev \
  linux-headers \
  freetype-dev \
  postgresql-dev \
  libzip-dev \
  libxslt-dev \
  oniguruma-dev \
  $PHPIZE_DEPS && \
  rm -rf /var/cache/apk/*

# Configure php dependency
RUN docker-php-ext-configure soap --enable-soap
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Install php dependencies
RUN docker-php-ext-install \
  -j$(nproc) gd \
  #  iconv \
  bcmath \
  xml \
  soap \
  mbstring \
  pdo \
  pdo_mysql \
  pdo_pgsql \
  mysqli \
  zip \
  opcache \
  intl \
  xsl \
  exif \
  soap

# Workdir
WORKDIR ${WORKDIR}

# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Copy php settings
COPY ./docker/php/conf.d ${PHP_INI_DIR}/conf.d

COPY ./docker/php/crontab  /var/spool/cron/crontabs/root

# Copy files to container
COPY ./ /var/www/app.dev/

# Install composer
RUN ./docker/php/install-composer.sh

# Expose port 9000 and start php-fpm server
EXPOSE 9000

## Run entrypoint
#COPY ./docker/php/entrypoint.sh /usr/bin/docker-entrypoint
#RUN ["chmod", "+x", "/usr/bin/docker-entrypoint"]

#CMD [ "docker-entrypoint" ]