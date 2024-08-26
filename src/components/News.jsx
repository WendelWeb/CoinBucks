import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://image.cnbcfm.com/api/v1/image/106928219-1629130755312-gettyimages-1234311531-sindeyev-notitle210729_np12K.jpeg?v=1709840389&w=929&h=523&vtcrop=y";
const demoIcon =
  "https://play-lh.googleusercontent.com/jGpj_gR6iUi1FqHZ8w__2G0zonoONbRYkYIgARnKpOtKL7we9d213Bvn6AOUMF5WVgOV";

export default function News({ simplified }) {
  const [cryptoNewsData, setCryptoNewsData] = useState([]);
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const [limit, setLimit] = useState(0);
  let { data, isFetching } = useGetCryptoNewsQuery(newsCategory);
  const { data: cryptosData } = useGetCryptosQuery(50);
  const [cryptoCoins, setCryptoCoins] = useState(cryptosData?.data.coins);
  // console.log("well", cryptosData);

  useEffect(() => {
    data && setCryptoNewsData([...data.results]);
    simplified ? setLimit(3) : setLimit(cryptoNewsData.length - 1);
    console.log(cryptoNewsData);
  }, [cryptoCoins, cryptosData]);

  if (isFetching) return <Loader />;
  console.log(cryptoNewsData);

  return (
    <>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >
              0
            }
          >
            {cryptoCoins?.map((currency) => (
              <>
                <Option key={currency.id} value={currency.name}>
                  {currency.name}
                </Option>
              </>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNewsData?.slice(0, limit).map((news) => (
          <Col xs={24} sm={12} lg={8} key={news.article_id}>
            <Card hoverable className="news-card">
              <a href={news.link} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                  <img
                    className="img"
                    src={news.image_url ? news.image_url : demoImage}
                    alt="news-image"
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news?.description?.length > 500
                    ? `${news.description.substring(1, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={news.source_icon ? news.source_icon : demoIcon}
                    />
                    <Text className="provider-name">
                      {news.creator ? news.creator[0] : "currency-stuff"}
                    </Text>
                  </div>
                  <Text>{moment(news.pubDate).startOf("ss").fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
