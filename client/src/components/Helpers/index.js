import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import TeamCard from '../Cards/TeamCard';
import { findAllTeamsUser } from '../../api/axios';
import { useAuth } from '../../contexts/authContext';


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

export async function checkTeam (token) {
    const userTeams = await findAllTeamsUser(token);
    return userTeams.allTeams
    // setResults(userTeams.allTeams)
}

export async function teamDetail(user) {
    const userTeams = await findAllTeamsUser(user);
    let cont = 0
    userTeams.allTeams.map((team) => {
        team.players.map((player) => {
            if (player === userTeams.playerId._id) {
                cont++
            }
        })
        if (cont > 1) {
            return (true)
        } else {
            return (false)
        }
    })
}
