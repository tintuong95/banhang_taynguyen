import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />


          <title>Tây Nguyên Food - Đặc sản chất lượng vùng tây nguyên</title>
        
          <meta name="RATING" content="GENERAL" />
          <meta content="INDEX,FOLLOW" name="robots" />
          <meta name="viewport" content="width=device-width" />
          <meta name="copyright" content="Tây nguyên food" />
          <meta name="author" content="Tây nguyên food" />
          <meta http-equiv="audience" content="General" />
          <meta name="resource-type" content="Document" />
          <meta name="distribution" content="Global" />
          <meta name="revisit-after" content="1 days" />
          <meta name="GENERATOR" content="Tây nguyên food" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <link href="/favicon_TGDD.ico" rel="shortcut icon" type="image/x-icon" />
          <link href="/favicon_TGDD.ico" rel="apple-touch-icon" />
          <link href="/favicon_TGDD.ico" rel="apple-touch-icon-precomposed" />
          <meta property="og:site_name" content="taynguyenfood.com" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="vi_VN" />
          <meta property="fb:pages" content="214993791879039" />
          <meta http-equiv="x-dns-prefetch-control" content="on"/>
        </Head>
        <body>
          <Main />
          <NextScript />
         
        </body>
      </Html>
    );
  }
}

export default MyDocument;
