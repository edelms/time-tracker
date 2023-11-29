import { Show } from "solid-js";

type Props = {
    enable?: boolean;
    class?: string;
}

export const Shimmer = (props: Props) => {

    return (
        <div class="absolute -inset-0.5 rounded-md overflow-hidden pointer-events-none">
            <Show when={props.enable}>
                <div class="shimmer"></div>
            </Show>
        </div>
    )

}
