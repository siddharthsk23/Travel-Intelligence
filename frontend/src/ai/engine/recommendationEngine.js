import destinations from "../data/destinations";

export function getRecommendations(profile){

    const scored = destinations.map(destination=>{

        let score = 0;

        destination.tags.forEach(tag=>{

            if(tag===profile.travelStyle)
                score += 3;

            if(tag===profile.mustHave)
                score += 3;

            if(tag===profile.tripPace)
                score += 2;

            if(tag===profile.priority)
                score += 2;

        });

        return{

            ...destination,

            score

        };

    });

    scored.sort((a,b)=>b.score-a.score);

    return scored.slice(0,3);

}