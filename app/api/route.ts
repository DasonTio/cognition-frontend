import { fireStorage } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get("file")
    if (file && typeof file === 'string') {
        try {
            const fileRef = ref(fireStorage, file)
            const filePublicURL = await getDownloadURL(fileRef)
            return Response.json({ filePublicURL })
        } catch (e: any) {
            const tmp = e.message || e.toString()
            console.log(tmp)
            return Response.json(tmp, {
                status: 200,
                // headers : {}
            })
        }
    }
    return Response.json({
        message: "Hello"
    })
}

export async function POST(request: Request) {

}
