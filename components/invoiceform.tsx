import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Group,
  NumberInput,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  Switch,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Currency,
  IInvoiceBase,
  IInvoiceHistory,
  IInvoiceItem,
  InvoiceType,
  PaymentFrequency,
} from "../models/invoice";
import { IconTrash } from "@tabler/icons-react";
import { IPaperProps } from "../types/mantine-types";
import { useLocalStorage } from "@mantine/hooks";

interface InvoiceFormProps {
  invoice_type: InvoiceType;
  payfreq: PaymentFrequency;
  currency: Currency;
  client_name: string;
  date: Date;
  invoice_name: string;
  invoice_items: IInvoiceItem[];
  isPaid: boolean;
}

export function InvoiceForm(props: IPaperProps) {
  const [invoices, setInvoices] = useLocalStorage<IInvoiceHistory>({
    key: "invoiceDB",
    defaultValue: [],
  });

  const form = useForm<InvoiceFormProps>({
    initialValues: {
      invoice_type: InvoiceType.ONE_TIME_PAYMENT,
      payfreq: PaymentFrequency.MONTHLY,
      currency: Currency.USD,
      client_name: "",
      date: new Date(),
      invoice_name: "",
      invoice_items: [],
      isPaid: false,
    },
  });

  const invoiceItems = form.values.invoice_items.map((item, index) => (
    <Grid key={index}>
      <Grid.Col span={6}>
        <TextInput
          placeholder="Service Name"
          {...form.getInputProps(`invoice_items.${index}.service_name`)}
        />
      </Grid.Col>

      <Grid.Col span={5}>
        <NumberInput
          placeholder="Price"
          {...form.getInputProps(`invoice_items.${index}.price`)}
        />
      </Grid.Col>

      <Grid.Col span={1}>
        <ActionIcon
          onClick={() => form.removeListItem("invoice_items", index)}
          mx={"auto"}
          my={4}
        >
          <IconTrash />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  ));

  function formSubmitHandler(values: InvoiceFormProps) {
    let new_invoice: IInvoiceBase = {
      id: Math.floor(Math.random() * 100000),
      date: values.date,

      client_id: 999,
      client_name: values.client_name,
      client_email: "",

      invoice_name: values.invoice_name,
      invoice_items: values.invoice_items,
      invoice_currency: values.currency,

      isPaid: values.isPaid,
      invoice_type: values.invoice_type,
      payfreq: values.payfreq,
    };

    console.log(values);
    setInvoices((prev) => [...prev, new_invoice]);
  }

  return (
    <Paper p={10} withBorder {...props}>
      <Title order={3} align="center" mb={10}>
        Create a Invoice
      </Title>
      <form onSubmit={form.onSubmit(formSubmitHandler)}>
        <Stack>
          <SegmentedControl
            data={[InvoiceType.ONE_TIME_PAYMENT, InvoiceType.RECURRING_PAYMENT]}
            {...form.getInputProps("invoice_type")}
          />
          {form.values.invoice_type == InvoiceType.RECURRING_PAYMENT && (
            <SegmentedControl
              data={[
                PaymentFrequency.WEEKLY,
                PaymentFrequency.MONTHLY,
                PaymentFrequency.QUARTERLY,
                PaymentFrequency.YEARLY,
              ]}
              {...form.getInputProps("payfreq")}
            />
          )}

          <Divider my={"xs"} />

          <Select
            label="Currency"
            data={[Currency.USD, Currency.EUR, Currency.INR, Currency.JPY]}
            {...form.getInputProps("currency")}
          />

          <TextInput
            label="Client Name"
            {...form.getInputProps("client_name")}
          />

          <TextInput
            label="Invoice Name"
            {...form.getInputProps("invoice_name")}
          />
          <Paper withBorder p={10}>
            <Grid>
              <Grid.Col span={6}>Service Name</Grid.Col>
              <Grid.Col span={4}>Price</Grid.Col>
            </Grid>
            <Divider my={"xs"} />

            <Stack mah={500}>
              {invoiceItems.length == 0 ? (
                <Text align="center">No items</Text>
              ) : (
                invoiceItems
              )}

              <Group align="end" position="right">
                <Text align="center">. . . . . .</Text>
                <Button
                  onClick={() =>
                    form.insertListItem("invoice_items", {
                      service_name: "",
                      price: null,
                    })
                  }
                >
                  Add Item
                </Button>
              </Group>
            </Stack>
          </Paper>

          <Group position="apart" px={30}>
            <Switch
              labelPosition="left"
              label="Paid Already ??"
              {...form.getInputProps("isPaid")}
            />
            <Button type="submit" color="red">
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
