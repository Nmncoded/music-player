import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, Image, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import TracksListItem from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
	const handleTrackselect = async (track: Track) => {
		console.log(track)
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>

					<Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyContentImage} />
				</View>
			}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackSelect={handleTrackselect} />
			)}
			{...flatListProps}
		/>
	)
}

export default TracksList
