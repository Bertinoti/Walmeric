import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


//TODO this function is to upload a img and return a url
export async function getRefUrl(values) {
    const refLogo = ref(storage, values.logo.name)
    const uploadFile = await uploadBytes(refLogo, values.logo)
    const url = await getDownloadURL(refLogo)
    const team = {
        teamName: values.teamName,
        logo: url,
        city: values.region,
        country: values.country,
    }
    return team;
}

// const handleSearch = (e) => {
//     setSearchBar(e.target.value)
//     const string = e.target.value.toLowerCase()
//     if (string === "") {
//         setGifnew(allGifs);
//     }
//     if (string !== "") {
//         const gifName = allGifs.filter((gif) =>
//             gif.gifname.toLowerCase().includes(string)
//         );
//         const gifDescription = gifnew.filter((gif) =>
//             gif.description.toLowerCase().includes(string)
//         );
//         if (gifName.length > 0) {
//             setGifnew(gifName);
//         } else {
//             setGifnew(gifnew);
//         }
//         if (gifDescription.length > 0) {
//             setGifnew(gifDescription);
//         } else {
//             setGifnew(gifnew);
//         }
//     }

// }
