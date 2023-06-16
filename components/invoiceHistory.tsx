import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Chip,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IInvoiceHistory, InvoiceType } from "../models/invoice";
import { IconLink, IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

type FilterPayType = [boolean, boolean];

function ArrayCompare(original: FilterPayType, compare: FilterPayType) {
  let x = original[0] == compare[0];
  let y = original[1] == compare[1];
  return x && y;
}

export function InvoiceHistory() {
  const [invoices, setInvoices] = useLocalStorage<IInvoiceHistory>({
    key: "invoiceDB",
    defaultValue: [],
  });
  const [filter, setFilter] = useState<FilterPayType>([true, true]);

  const rows = invoices.map((item) => {
    const compare = (compare: FilterPayType) => {
      return ArrayCompare(filter, compare);
    };

    let itemFilterTruthyness =
      compare([false, false]) ||
      (compare([true, false]) &&
        item.invoice_type === InvoiceType.RECURRING_PAYMENT) ||
      (compare([false, true]) &&
        item.invoice_type === InvoiceType.ONE_TIME_PAYMENT);

    if (itemFilterTruthyness) return null;

    return (
      <tr
        key={item.invoice_name}
        onClick={() => Router.push(`/pay/${item.id}`)}
        style={{
          cursor: "pointer",
        }}
      >
        <td>
          <Group spacing="sm">
            <Text fz="sm" fw={500}>
              {item.invoice_name}
            </Text>
            <Badge>{item.client_name}</Badge>
          </Group>
        </td>

        <td>{item.isPaid ? "Paid" : "Pending"}</td>
        <td>{item.invoice_type}</td>
        <td>
          {item.invoice_currency}{" "}
          {item.invoice_items.reduce((a, b) => a + b.price, 0)}
        </td>
        <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
        <td>
          <Group spacing={0} position="center">
            <Link href={`/pay/${item.id}`}>
              <ActionIcon>
                <IconLink size="1rem" stroke={1.5} />
              </ActionIcon>
            </Link>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Paper withBorder p={10}>
      <Stack spacing={"xl"}>
        <Title order={3} align="center">
          Invoice History
        </Title>

        <Group spacing={"md"}>
          <Text>Filter: </Text>
          <Group spacing={0}>
            <Chip
              defaultChecked
              variant="light"
              checked={filter[0]}
              onChange={() => setFilter((prev) => [!prev[0], prev[1]])}
            >
              One-Time
            </Chip>
            <Chip
              defaultChecked
              variant="light"
              checked={filter[1]}
              onChange={() => setFilter((prev) => [prev[0], !prev[1]])}
            >
              Recurring
            </Chip>
          </Group>
        </Group>

        <ScrollArea>
          <Table
            sx={{ minWidth: 600 }}
            verticalSpacing="sm"
            highlightOnHover
            withBorder
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Pay Status</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th />
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Paper>
  );
}
