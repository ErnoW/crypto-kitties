import React, { useEffect } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  Link,
  Grid,
  Paper,
} from "@material-ui/core";
import { Factory } from "./pages/Factory";
import { Home } from "./pages/Home";
import { Link as RouterLink, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Error404 } from "./pages/Error404";
import { CataloguePage } from "./pages/CataloguePage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useKittyCoreContract } from "./hooks/useContract";
import { useStore, Store } from "./store/Store";
import { useWeb3React } from "@web3-react/core";
import { MyKitties } from "./pages/MyKitties";
import { KittyDetail } from "./pages/KittyDetail";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OthersKitties } from "./pages/OthersKitties";
import { MarketPlace } from "./pages/MarketPlace";
import { primaryColor } from "./theme/theme";
import { useOwnedKitties } from "./hooks/useOwnedKitties";
import { NavigationBar } from "./components/layout/NavigationBar";
import { routes } from "./routes";
import { Footer } from "./components/layout/Footer";

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
`;

function App() {
  const kittyCore = useKittyCoreContract();
  const store = useStore();
  const { account, chainId } = useWeb3React();

  // Load initial data
  useEffect(() => {
    store.setAccount(account ?? null);

    if (kittyCore) {
      kittyCore.functions.isOwner().then((value) => store.setIsOwner(value[0]));
    } else {
      store.setIsOwner(false);
    }
  }, [kittyCore, account]);

  return (
    <>
      <CssBaseline />
      <AppWrapper>
        {chainId !== 3 &&<Paper variant="outlined" square>
          <Box px={2} py={1} display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="overline"
            align="center"
            color="textPrimary"
          >
            Currently available on Ropsten testnet
          </Typography>
          </Box>
        </Paper>}
        <NavigationBar menuItems={routes(store)} />
        <Main>
          <Container>
            <Box my={2}>
              <Routes store={store} />
            </Box>
          </Container>
        </Main>
        <Footer />
      </AppWrapper>
    </>
  );
}

const Routes = ({ store }: { store: Store }) => {
  return (
    <Switch>
      {routes(store).map(({ component: Component, to, isAllowed }) => {
        return (
          <ProtectedRoute key={to} path={to} exact isAllowed={isAllowed}>
            <Component />
          </ProtectedRoute>
        );
      })}
    </Switch>
  );
};
export default App;
