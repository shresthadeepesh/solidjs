import { For, Show, createSignal } from "solid-js";
import Button from "../Button/button";
import { useTheme } from "../../stores/theme";
import useQuery from "../../hooks/useQuery";
import Spinner from "../Spinner/spinner";
import { Api } from "../../api";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  status: boolean;
};

const Posts = () => {
  const [showPosts, setShowPosts] = createSignal(true);
  const [theme] = useTheme();
  const { isLoading, isError, isFetching, error, data, refetch } = useQuery<
    Post[]
  >({
    apiKey: Api.FetchPosts,
  });

  const toggleShowPosts = () => {
    setShowPosts(!showPosts());
  };

  return (
    <>
      <div class="my-5">
        {theme()}
        <Show
          when={!showPosts()}
          fallback={
            <div class="space-x-2">
              <Button title={"Hide Post"} onClick={toggleShowPosts} />
              <Button title={"Refresh"} onClick={refetch} />
            </div>
          }
        >
          <Button title={"Show Post"} onClick={toggleShowPosts} />
        </Show>

        <Show
          when={!isLoading() || !isFetching()}
          fallback={
            <>
              <div class="flex justify-center items-center h-96">
                <Spinner />
              </div>
            </>
          }
        >
          <Show
            when={!isError()}
            fallback={
              <div class="">
                <div class="">Something wen't wrong.</div>
                <div class="">{JSON.stringify(error())}</div>
              </div>
            }
          >
            <div class="my-2">
              <Show when={showPosts()}>
                <div class="flex flex-wrap">
                  <For each={data()}>
                    {(post) => (
                      <>
                        <div class="bg-gray-100 shadow-md m-2 p-2 rounded-md hover:shadow-lg transition-shadow duration-300">
                          <div class="">{post.title}</div>
                          <div class="">
                            <Show when={post.status} fallback={"Draft"}>
                              Published
                            </Show>
                            <div class="">{post.body}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
};

export default Posts;
