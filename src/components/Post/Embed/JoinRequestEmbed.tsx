import {View} from 'react-native'
import {type ChatBskyGroupDefs} from '@atproto/api'
import {Plural, Trans, useLingui} from '@lingui/react/macro'

import {createSanitizedDisplayName} from '#/lib/moderation/create-sanitized-display-name'
import {sanitizeHandle} from '#/lib/strings/handles'
import {MEMBER_LIMIT} from '#/screens/Messages/ConversationSettings/constants'
import {atoms as a, useTheme} from '#/alf'
import {AvatarBubbles} from '#/components/AvatarBubbles'
import {Button, ButtonIcon, ButtonText} from '#/components/Button'
import {ArrowBoxRight_Stroke2_Corner3_Rounded as ArrowBoxRightIcon} from '#/components/icons/ArrowBoxRight'
import {Text} from '#/components/Typography'

export function JoinRequestEmbed({
  group,
}: {
  group: ChatBskyGroupDefs.JoinLinkPreviewView
}) {
  const t = useTheme()
  const {t: l} = useLingui()
  const ownerDisplayName = createSanitizedDisplayName(group.owner)
  const ownerHandle = sanitizeHandle(group.owner.handle, '@')

  const realMembers = group.convo?.members ?? [group.owner]
  const avatarProfiles = [
    ...realMembers,
    ...new Array(Math.max(0, group.memberCount - realMembers.length)),
  ]

  return (
    <View
      style={[
        a.border,
        a.rounded_md,
        a.p_lg,
        a.gap_md,
        t.atoms.border_contrast_low,
      ]}>
      <View style={[a.flex_row, a.gap_md, a.align_center, a.mb_lg]}>
        <AvatarBubbles size={56} self profiles={avatarProfiles} />
        <View style={[a.flex_1]}>
          <Text
            emoji
            style={[a.text_lg, a.font_bold, a.leading_tight, t.atoms.text]}
            numberOfLines={1}>
            {group.name}
          </Text>
          <Text
            style={[
              a.mt_2xs,
              a.mb_sm,
              a.text_xs,
              a.leading_snug,
              a.font_medium,
              t.atoms.text_contrast_high,
            ]}
            numberOfLines={1}>
            <Trans>
              Group chat · {group.memberCount}/{MEMBER_LIMIT}{' '}
              <Plural value={group.memberCount} one="member" other="members" />
            </Trans>
          </Text>
          <Text
            emoji
            style={[
              a.text_sm,
              a.leading_snug,
              a.font_medium,
              a.leading_tight,
              t.atoms.text,
            ]}
            numberOfLines={1}>
            <Trans>
              By{' '}
              <Text
                style={[
                  a.text_sm,
                  a.leading_snug,
                  a.font_medium,
                  a.leading_tight,
                  t.atoms.text,
                ]}>
                {ownerDisplayName}
              </Text>{' '}
              <Text
                style={[
                  a.text_sm,
                  a.leading_snug,
                  a.leading_tight,
                  t.atoms.text_contrast_medium,
                ]}>
                {ownerHandle}
              </Text>
            </Trans>
          </Text>
        </View>
      </View>
      <Button
        disabled
        label={l`Join group chat`}
        color="primary"
        size="large"
        onPress={() => {
          /* Intentional no-op for composer preview; for display only. */
        }}>
        <ButtonIcon icon={ArrowBoxRightIcon} />
        <ButtonText>
          <Trans>Join group chat</Trans>
        </ButtonText>
      </Button>
    </View>
  )
}
