/** @type {import('next').NextConfig} */
// NextのImageタグで画像をLinkから取る場合にした記載必須
module.exports = {
  images: {
    domains: ["links.papareact.com"],
  },
  env: {
    Rakuten_key: "c34c2cb78e958c98b4005a1d18740bca247e1700"
    // Rakuten_key: "your super secret key"
  },

}