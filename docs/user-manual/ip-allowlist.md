# IP Allowlist

IP allowlist is a powerful application level firewall feature that Chronicle supports to help protect you and your clients' personal data. The IP allowlist enables you to set a fixed list of IP addresses that can access the application to ensure imposters outside your network have no access to your data. To configure the IP allowlist, follow this guide.

## Create new allowlist entries

By default, we have `0.0.0.0/0` setup for you, this address allows access from all possible IP addresses and is not safe, we recommend you update the allowlist as soon as possible to reflect the network of your establishment.

Steps:

1. Select **IP allowlist** on the side drawer.
2. Click **Add new**
3. Add an IP address and provide a description for additional context

### How IP verification works on Chronicle

Chronicle uses Classless Inter-Domain Routing (CIDR) method to verify your IP address, this means you can allow several IP addresses by providing a subnet IP instead of just an IP address. If you are unsure how this works, we recommend that you simply use a single IP address. Chronicle supports both IPv4 and IPv6 addresses.

## Delete an existing entry

Be careful, if you delete the entry you are actively using, you risk loosing access to the application immediately.

Steps:

1. Select **IP allowlist** on the side drawer.
2. Click the garbage can icon next to the entry you want to delete.
