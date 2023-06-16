import { Affix, Button, Grid, Group, Paper, rem, Text } from "@mantine/core";

import { InvoiceForm } from "../components/invoiceform";
import { InvoiceHistory } from "../components/invoiceHistory";

export default function Home() {
  return (
    <>
      <Grid py={10} w={"99.5vw"} px={20}>
        <Grid.Col span={6}>
          <InvoiceForm />
        </Grid.Col>
        <Grid.Col span={6}>
          <InvoiceHistory />
        </Grid.Col>
      </Grid>

      <Affix position={{ bottom: rem(20), left: rem(20) }}>
        <Paper withBorder p={10}>
          <Group position="apart">
            <Text>Prototype Options:</Text>
            <Button onClick={() => localStorage.removeItem("invoiceDB")}>
              Clear Invoice History
            </Button>
          </Group>
        </Paper>
      </Affix>
    </>
  );
}
