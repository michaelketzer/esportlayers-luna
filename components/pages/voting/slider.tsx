import { ReactElement } from "react";
import SliderFrame from "../../betting/Slider/SliderFrame";
import { Wisp } from "@esportlayers/io";
import getWebsocketUrl from "../../../modules/Router";
import { useAbortFetch } from "../../../hooks/abortFetch";
import { fetchUser } from "../../antiSnipe/Overlay";

export default function SliderPage({auth, testing}: {auth: string; testing: boolean}): ReactElement {
    const [user] = useAbortFetch(fetchUser, auth);
    if(user && Boolean(user.useVoteDistributionOverlay)) {
        return <Wisp url={getWebsocketUrl() + '/bets/live/' + auth}>
            <SliderFrame auth={auth} testing={testing} />
        </Wisp>;
    }

    return null;
}