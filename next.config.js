/** @type {import('next').NextConfig} */
// NextのImageタグで画像をLinkから取る場合にした記載必須
module.exports = {
  images: {
    domains: ["links.papareact.com","https://img.travel.rakuten.co.jp"],
  },
  // images: {
  //   domains: ["https://img.travel.rakuten.co.jp"],
  // },
  env: {
    Rakuten_key: "a776b80994c10a425b9ceb0162c7570c6849ec65"
    // Rakuten_key: "your super secret key"
  },

}