import { useState, useEffect } from "react";
import linkIcon from "../assets/link.svg";
import copy from "../assets/copy.svg";
import loader from "../assets/loader.svg";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [articles, setArticles] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getSummary({ articleUrl: articles.url });
      if (data?.summary) {
        const newArticles = { ...articles, summary: data.summary };
        const updatedAllArticles = [newArticles, ...allArticles];

        setArticles(newArticles);
        setAllArticles(updatedAllArticles);
        console.log(newArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      if (error.response && error.response.status === 503) {
        console.error("Service Unavailable. Please try again later.");
      } else {
        console.error("Error getting summary:", error);
      }
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter Your URL"
            value={articles.url}
            onChange={(e) => setArticles({ url: e.target.value })}
            className="url_input peer"
            required
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>
        {/* URL history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticles(article)}
              className="link_card flex justify-between items-center"
            >
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <div className="flex flex-col justify-center items-center">
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
            <p className="text-sm font-semibold">Thank You for your patience</p>
          </div>
        ) : error ? (
          <p className="font-inter">
            Well, that{"'"}s not supposed to happen. Please try again.
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          articles.summary && (
            <div className="flex flex-col fap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {articles.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
