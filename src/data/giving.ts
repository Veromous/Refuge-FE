// Direct-giving details for donors who prefer to send funds themselves
// (crypto wallets and a Mobile Money number), shown on the Donate page.
//
// >>> THESE ARE FAKE PLACEHOLDER VALUES — NOT REAL RECEIVING ADDRESSES. <<<
// Replace them with your real wallet addresses and MoMo number, then set
// `givingIsPlaceholder` to false to hide the "sample details" warning banner.

// While true, the Donate page shows a notice that these details are not real.
export const givingIsPlaceholder = true

export interface CryptoAddress {
  name: string // e.g. 'Bitcoin'
  symbol: string // e.g. 'BTC'
  network: string // e.g. 'Bitcoin' or 'TRC-20'
  address: string
}

export const cryptoAddresses: CryptoAddress[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin',
    address: 'bc1qexampleonly0notreal0refugeofhope0sampled0not0valid',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    network: 'TRC-20',
    address: 'TExampleOnly0NotReal0RefugeOfHope0Sample0NotValid',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'ERC-20',
    address: '0xExampleOnly0NotReal0RefugeOfHope0Sample0NotValid00',
  },
]

export const mobileMoney = {
  label: 'Mobile Money',
  number: '+237 6 55 55 55 55',
  accountName: 'Refuge of Hope Association',
  note: 'Send directly, then use your name as the reference.',
}
