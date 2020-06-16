import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Axios from "axios";
import { URL } from "./App";

function SearchResult({
  match: {
    params: { query },
  },
  history,
}) {
  const [searchResult, setSearchResult] = useState(undefined);
  useEffect(() => {
    Axios.get(URL + "search/" + query)
      .then(({ data }) => {
        console.log(data);
        setSearchResult(() => {
          return data;
        });
      })
      .catch(({ error }) => console.log(error));
  }, [query]);

  function sendFeedback(accurate) {
    let feedback = {
      accurate: accurate,
      queriedKeyword: query,
      isMatched: searchResult.matched != null,
      categoryID:
        searchResult.matched != null
          ? searchResult.matched.categoryID
          : searchResult.recommend.categoryID,
    };
    Axios.post(URL + "search/feedback", feedback)
      .then(() => {
        alert("의견 감사합니다!");
      })
      .catch(({ error }) => console.log(error));
  }

  return (
    <Container className="mt-md-3">
      <SearchBar prefix={query} history={history} />

      {searchResult === undefined ? (
        <h4 className="text-center">검색중입니다.</h4>
      ) : (
        <div className="text-center">
          <h3 className="text-center">
            {searchResult.matched === null
              ? query
              : searchResult.matched.representation}
            에 대한 검색 정보입니다.
          </h3>
          {searchResult.recommend === null ? null : (
            <div className="mb-3">
              <h5>아래와 같은 것들을 찾고 계신가요?</h5>
              <Button
                className="mx-auto"
                onClick={() =>
                  history.push(
                    "/search/result/" + searchResult.recommend.representation
                  )
                }
              >
                {searchResult.recommend.representation}
              </Button>
            </div>
          )}

          {searchResult.matched === null ? (
            <h5>
              추천 검색어가{" "}
              <Button size="sm" onClick={() => sendFeedback(true)}>
                정확해요!
              </Button>
              {"  "}
              <Button size="sm" onClick={() => sendFeedback(false)}>
                부정확해요!
              </Button>
            </h5>
          ) : (
            <h5>
              검색어 보정 기능이{" "}
              <Button size="sm" onClick={() => sendFeedback(true)}>
                정확해요!
              </Button>
              {"  "}
              <Button size="sm" onClick={() => sendFeedback(false)}>
                부정확해요!
              </Button>
            </h5>
          )}

          <h5>
            {searchResult.classes.length === 0
              ? "검색하신 강의가 없습니다."
              : searchResult.classes.length + "개의 강의가 있어요."}
          </h5>

          {searchResult.classes.map((_class) => {
            return (
              <Card
                className="mt-3"
                style={{ maxWidth: "400px", margin: "auto" }}
                body
                key={_class._id}
              >
                <a href={"/#/class/id/" + _class._id}>{_class.className}</a>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default SearchResult;
