import chai, { expect } from 'chai';

/* --- configuração para trabalhar com fetch --- */
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

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

	describe('Generic Search', () => {
		it('should call fetch function', () => {
			const fetchedStub = sinon.stub(global, 'fetch');
			const artists = search();
			expect(fetchedStub).to.have.been.calledOnce
		})
	})
});