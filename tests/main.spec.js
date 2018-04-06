import { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main'

describe('Spotify Wrapper', () => {
	describe('smoke tests', () => {

		it('sould exist the search method', () => {
			expect(search).to.exist;
		})

		it('sould exist the searchAlbums method', () => {
			expect(searchAlbums).to.exist;
		})

		it('sould exist the searchArtists method', () => {
			expect(searchArtists).to.exist;
		})

		it('sould exist the searchTracks method', () => {
			expect(searchTracks).to.exist;
		})

		it('sould exist the searchPlaylists method', () => {
			expect(searchPlaylists).to.exist;
		})
	})
});