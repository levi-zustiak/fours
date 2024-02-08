type Page = {
  url: string;
  version: string;
  props: unknown;
};

export function inertiaAdapter({
  version,
  html,
  flashMessages,
  enableReload = false,
}) {
  return (req, res, next) => {
    // if (
    //   req.method === 'GET' && req.header('X-Inertia')
    // ) {

    // }

    let _viewData = {};
    let _sharedProps = {};
    let _statusCode = 200;
    let _headers = {};

    const Inertia = {
      setViewData(viewData) {
        _viewData = viewData;
        return this;
      },
      shareProps(sharedProps) {
        _sharedProps = { ..._sharedProps, ...sharedProps };
        return this;
      },
      setStatusCode(statusCode) {
        _statusCode = statusCode;
        return this;
      },
      setHeaders(headers) {
        _headers = { ...req.headers, ..._headers, ...headers };
        return this;
      },
      async render({ props = {}, ...rest }) {
        const _page: Page = {
          ...rest,
          url: req.originalUrl || req.url,
          version,
          props,
        };

        // Setup the flash messages here
        if (flashMessages) {
        }

        const allProps = { ..._sharedProps, ...props };

        _page.props = allProps;

        // Setting the partial component here
        // let dataKeys;
        // const partialDataHeader = req.header('')

        res.vary('X-Inertia');

        if (req.header('X-Inertia')) {
          res
            .header('X-Inertia', 'true')
            .type('json')
            .send(JSON.stringify(_page));
        } else {
          res.type('html');

          // Add view data
          res.status(_statusCode).type('html').send(html(_page));
        }

        return res;
      },

      redirect(url) {
        const statusCode = ['PUT', 'PATCH', 'DELETE'].includes(req.method)
          ? 303
          : 302;

        res.redirect(statusCode, url);
        return res;
      },
    };

    req.Inertia = Inertia;

    return next();
  };
}
