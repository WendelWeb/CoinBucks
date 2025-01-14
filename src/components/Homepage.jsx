import millify from "millify";
import { Typography, Statistic, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Crytocurrencies from "./Crytocurrencies";
import News from "./News";
import Loader from "./Loader";

const { Title } = Typography;

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  console.log(globalStats);

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats?.total)}
          />
          <br />
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
          <br />
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
          <br />
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Crytocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Cryto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news">News</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}
