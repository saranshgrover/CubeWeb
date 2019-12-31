import * as firebase from 'firebase'
import firebaseConfig from './firebaseConfig.json'
import { async } from 'q'

export const initializeDatabase = () => {
    console.log('Initializing firebase...')
    firebase.initializeApp(firebaseConfig)
}

/**
 *
 * @param competitionId Id of the competition to be added to firestore. This parameter will most likely change in the future in order to store more infomration on first write.
 * @param checkIfCompIsInDB True by default. Will check if the competition is in the database already. This will consume a read operation.
 */
export const createCompetition = async (
    competitionId: string,
    checkIfCompIsInDB = true
) => {
    // Get firestore
    const db = firebase.firestore()
    if (checkIfCompIsInDB) {
        let document = await getCompetition(competitionId)
        if (!document.exists) {
            // There is no competition with ID in database
            let addedComp = await db
                .collection('competitions')
                .doc(competitionId)
                .set({
                    id: competitionId
                })
        }
    } else {
        let addedComp = await db
            .collection('competitions')
            .doc(competitionId)
            .set({
                id: competitionId
            })
    }
}

/**
 *
 * @param competitionId ID of the competition
 *
 * @returns Returns a DocumentSnapshot
 */
export const getCompetition = async (competitionId: string) => {
    // Get firestore
    const db = firebase.firestore()
    let document = await db
        .collection('competitions')
        .doc(competitionId)
        .get()
    return document
}

/**
 * Adds an event to the firestore for a given competition. WARNING: This operation will overwrite a preexisting event.
 *
 * @param competitionId ID of the competition
 * @param event Event type which will also function as the event ID. Examples: '333', '444', '333oh', 'pyram'.
 */
export const createEvent = async (competitionId: string, event: string) => {
    // Get firestore
    const db = firebase.firestore()
    await db
        .collection('competitions')
        .doc(competitionId)
        .collection('events')
        .doc(event)
        .set({ id: event })
}

/**
 * Adds a round to an event in the firestore. WARNING: This operation will overwrite a preexisting round.
 *
 * @param competitionId ID of the competition
 * @param event Event type which will also function as the event ID. Examples: '333', '444', '333oh', 'pyram'.
 * @param roundId Id for the round. Contains the format of the event appended with "-r#" where # represents the round number. Example: '333-r1'.
 * @param roundInfo An object containg round information such as format, scrambleSetCount, timeLimit, etc. This may parameter may merge with `roundId` in the future.
 */
export const createRound = async (
    competitionId: string,
    event: string,
    roundId: string,
    roundInfo: object
) => {
    // Get firestore
    const db = firebase.firestore()
    await db
        .collection('competitions')
        .doc(competitionId)
        .collection('events')
        .doc(event)
        .collection('rounds')
        .doc(roundId)
        .set({ id: roundId, ...roundInfo })
}

/**
 * Create a user's starting result. Used for creating the document. This operation should be done once per round per user.
 *
 * @param competitionId ID of the competition
 * @param event Event type which will also function as the event ID. Examples: '333', '444', '333oh', 'pyram'.
 * @param roundId Id for the round. Contains the format of the event appended with "-r#" where # represents the round number. Example: '333-r1'.
 * @param personId Id for the person
 */
export const createStartingResult = async (
    competitionId: string,
    event: string,
    roundId: string,
    personId: number
) => {
    // Get firestore
    const db = firebase.firestore()
    await db
        .collection('competitions')
        .doc(competitionId)
        .collection('events')
        .doc(event)
        .collection('rounds')
        .doc(roundId)
        .collection('results')
        .doc(personId.toString())
        .set({
            id: personId,
            attempts: [],
            ranking: null,
            best: null,
            average: null
        })
}

/**
 * Append a result time to the attempts array for a user in the results collection.
 *
 * @param competitionId ID of the competition.
 * @param event Event type which will also function as the event ID. Examples: '333', '444', '333oh', 'pyram'.
 * @param roundId Id for the round. Contains the format of the event appended with "-r#" where # represents the round number. Example: '333-r1'.
 * @param personId Id for the person.
 * @param result Time based result to add to attempts.
 */
export const addAttempt = async (
    competitionId: string,
    event: string,
    roundId: string,
    personId: number,
    result: number
) => {
    // Get firestore
    const db = firebase.firestore()
    const personRef = await db
        .collection('competitions')
        .doc(competitionId)
        .collection('events')
        .doc(event)
        .collection('rounds')
        .doc(roundId)
        .collection('results')
        .doc(personId.toString())
    personRef.update({
        attempts: firebase.firestore.FieldValue.arrayUnion(result)
    })
}
