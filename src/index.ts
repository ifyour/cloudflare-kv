import JSONBin from './JSONBin'

interface Post {
  id: string
  title: string
}

async function main() {
  try {
    const { JSON_BIN, KEY } = process.env
    if (!JSON_BIN || !KEY) {
      throw new Error('Set the environment variables JSON_BIN and KEY in .env.')
    }

    const jsonBin = new JSONBin({ api: JSON_BIN, key: KEY })

    // get
    const posts = await jsonBin.get('/demo/posts', [] as Post[])

    const nextPosts = posts.concat([{
      id: globalThis.crypto.randomUUID(),
      title: 'CloudFlare KV is awesome!'
    }])

    // set
    await jsonBin.set('/demo/posts', nextPosts)

  } catch (error) {
    console.log(error)
  }
}

main()
