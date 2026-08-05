import type { SocialNetwork } from '@meridian-synergy/ui'

/**
 * Single source of truth for the company's social accounts.
 *
 * Consumed by the footer social bar and by the /contact social cards, which
 * previously duplicated these URLs. Structured-data `sameAs` lists are
 * deliberately NOT derived from here: they confirm the entity's identity to
 * search engines and must stay complete even while an account is hidden.
 */
export interface SocialAccount {
  network: SocialNetwork
  label:   string
  /** Public handle, displayed on the /contact cards. */
  handle:  string
  href:    string
  /**
   * Keeps the account declared but out of the UI, while it has too little
   * content to be worth showing. Flip back to false to publish it again.
   */
  hidden?: boolean
}

export const socialAccounts: SocialAccount[] = [
  { network: 'instagram', label: 'Instagram', handle: '@meridian.synergy', href: 'https://www.instagram.com/meridian.synergy',        hidden: true },
  { network: 'linkedin',  label: 'LinkedIn',  handle: 'meridian-synergy',  href: 'https://www.linkedin.com/company/meridian-synergy/' },
  { network: 'tiktok',    label: 'TikTok',    handle: '@meridian.synergy', href: 'https://www.tiktok.com/@meridian.synergy',           hidden: true },
  { network: 'youtube',   label: 'YouTube',   handle: '@meridian.synergy', href: 'https://www.youtube.com/@meridian.synergy',          hidden: true },
]

/** Accounts that are actually rendered in the UI. */
export const visibleSocialAccounts = socialAccounts.filter(account => !account.hidden)
