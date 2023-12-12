
type Props = {
    message?: string;
}

export const Initializer = (props: Props) => {

    return (
        <div data-testid="initializer" class="w-screen h-screen flex flex-col items-center justify-center gap-5">

            <span class="loader"></span>

            <span class="text-neutral-400">
                {props.message}
            </span>

        </div>
    )

}
