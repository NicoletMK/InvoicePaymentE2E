import {
  Badge,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  Currency,
  IInvoiceBase,
  IInvoiceHistory,
  InvoiceType,
} from "../../models/invoice";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function InvoicePayViewPage() {
  const [invoices, setInvoices] = useLocalStorage<IInvoiceHistory>({
    key: "invoiceDB",
    defaultValue: [],
  });
  const router = useRouter();
  const data = invoices.find(
    (invoice) => invoice.id === parseInt(router.query.slug as string)
  );

  const PayClick = () => {
    let i = invoices.findIndex(
      (invoice) => invoice.id === parseInt(router.query.slug as string)
    );

    setInvoices((prev) => {
      prev[i].isPaid = true;
      return prev;
    });
  };

  return (
    <Flex justify={"center"} align={"center"} w={"100vw"} h={"100vh"}>
      <Paper shadow="md" radius="md" px="xl" py={"md"} w={"40%"} bg={"dark"}>
        {data ? (
          <>
            <Title order={1} align={"center"}>
              {data.invoice_name}
            </Title>
            <Text align={"center"}>
              To: {data.client_name} | Billed on{" "}
              {data.date.toString().slice(0, 10)}
            </Text>

            <Divider my="md" />

            <Stack mx={50}>
              <Group px={10}>
                <Text>Payment Type: </Text>
                <Badge color="gray" variant="outline">
                  {data?.invoice_type ? data?.invoice_type : "Unknown"}
                </Badge>
              </Group>
              {data.invoice_type === InvoiceType.RECURRING_PAYMENT && (
                <Group px={10}>
                  <Text>Pay Frequency: </Text>
                  <Badge color="gray" variant="outline">
                    {data?.payfreq!}
                  </Badge>
                </Group>
              )}

              <Paper withBorder p={10} title="items">
                <Grid>
                  <Grid.Col span={10}>Service Name</Grid.Col>
                  <Grid.Col span={2}>Price</Grid.Col>
                </Grid>
                <Divider my={"xs"} />

                <Stack>
                  {data.invoice_items.map((item) => (
                    <Grid>
                      <Grid.Col span={10}>{item.service_name}</Grid.Col>
                      <Grid.Col span={2}>
                        {data.invoice_currency} {item.price}
                      </Grid.Col>
                    </Grid>
                  ))}
                </Stack>
              </Paper>
            </Stack>

            <Divider my={"xs"} />

            <Title order={2} align={"center"} mt={"xs"}>
              Due Amount: {data.invoice_currency}{" "}
              {data.invoice_items.reduce((a, b) => a + b.price, 0)}
            </Title>

            <Center>
              <Button
                onClick={PayClick}
                variant="outline"
                color="red"
                mt={"md"}
                disabled={data.isPaid}
              >
                {data.isPaid ? "Paid" : "Pay Now"}
              </Button>
            </Center>
          </>
        ) : (
          <Text align={"center"}>Invoice not found</Text>
        )}
      </Paper>
    </Flex>
  );
}
