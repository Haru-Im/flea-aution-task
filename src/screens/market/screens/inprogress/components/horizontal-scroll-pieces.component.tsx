import React, { RefObject, memo } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { IArtPiecesType } from '../inprogress.type';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ProfileSvgComponent } from './profile-svg.component';

type IHorizontalScrollPiecesComponentProps = {
  piecesArray: IArtPiecesType;
  scrollViewRef: RefObject<ScrollView>;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HorizontalScrollPiecesComponent = memo<IHorizontalScrollPiecesComponentProps>(
  ({ piecesArray = [], scrollViewRef }) => {
    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {piecesArray.map((e, i) => {
          return (
            <View key={i} style={styles.box}>
              <View style={styles.itemBox}>
                <Text style={styles.auctionIdText}>{`작품ID (${e.auctionId})`}</Text>
                <Animated.Text entering={FadeIn.duration(300)} style={styles.viewCountText}>
                  {e.viewCount ?? 'n/a'}
                </Animated.Text>
              </View>
              <View style={styles.descriptionBox}>
                <View style={styles.profileWrapper}>
                  <ProfileSvgComponent />
                  <Text style={styles.authorText}>{e.author}</Text>
                </View>
                <Text numberOfLines={1} style={styles.titleText}>
                  {e.title}
                </Text>
                <Text style={styles.priceText}>{e.price}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },
  box: {
    padding: 8,
    width: SCREEN_WIDTH / 2,
    aspectRatio: 1 / 1.5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
    backgroundColor: 'white',
  },
  itemBox: {
    flex: 1,
    backgroundColor: 'gray',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    gap: 8,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
  },
  auctionIdText: { fontFamily: 'Pretendard-Medium', fontSize: 16 },
  viewCountText: { fontSize: 20, fontFamily: 'Pretendard-Bold' },
  descriptionBox: { flex: 1, gap: 8 },
  authorText: { fontFamily: 'Pretendard-SemiBold', color: '#727272', fontSize: 16 },
  titleText: { fontFamily: 'Pretendard-Light', fontSize: 18 },
  priceText: { fontFamily: 'Pretendard-Bold', color: '#161616', fontSize: 20 },
});