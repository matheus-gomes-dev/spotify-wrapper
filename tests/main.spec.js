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
	let fetchedStub;
	let promise;

	beforeEach( () => {
		fetchedStub = sinon.stub(global, 'fetch');
		promise = fetchedStub.returnsPromise();
	})

	afterEach( () => {
		fetchedStub.restore(); //necessário para poder testar fetch novamente
	})

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
			const artists = search();
			expect(fetchedStub).to.have.been.calledOnce;
		})

		it('should call fetch with the correct URL', () => {
			context('passing one type', () => {
				const artists = search('Nirvana', 'artist');
				expect(fetchedStub).to.have.been
					.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=artist');

				const albums = search('Nirvana', 'album');
				expect(fetchedStub).to.have.been
					.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=album');
			})
			context('passing more than one type', () => {
				const artistsAndAlbums = search('Nirvana', ['artist', 'album']);
				expect(fetchedStub).to.have.been
					.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=artist,album');
			})
		})

		it('should return the JSON Data from the Promise', () => {
			promise.resolves({ body: 'json'})
			const artists = search('Nirvana', 'artist');
			expect(artists.resolveValue).to.be.eql({body: 'json'});
		})
	})

	describe('searchArtists', () => {

		it('should call fetch function', () => {
			const artists = searchArtists('Nirvana');
			expect(fetchedStub).to.have.been.calledOnce;
		})

		it('should call fetch with the correct URL', () => {
			const artists = searchArtists("Nirvana");
			expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=artist');
		})
	})

	describe('searchAlbums', () => {

		it('should call fetch function', () => {
			const albums = searchAlbums('Nirvana');
			expect(fetchedStub).to.have.been.calledOnce;
		})

		it('should call fetch with the correct URL', () => {
			const albums = searchAlbums("Nirvana");
			expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=album');
		})
	})

	describe('searchTracks', () => {

		it('should call fetch function', () => {
			const tracks = searchTracks('Nirvana');
			expect(fetchedStub).to.have.been.calledOnce;
		})

		it('should call fetch with the correct URL', () => {
			const tracks = searchTracks("Nirvana");
			expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=track');
		})
	})

	describe('searchPlaylists', () => {

		it('should call fetch function', () => {
			const playlists = searchPlaylists('Nirvana');
			expect(fetchedStub).to.have.been.calledOnce;
		})

		it('should call fetch with the correct URL', () => {
			const playlists = searchPlaylists("Nirvana");
			expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Nirvana&type=playlist');
		})
	})
});