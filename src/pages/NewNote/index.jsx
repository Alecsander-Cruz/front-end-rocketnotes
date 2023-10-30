import { Container, Form } from './styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

export function NewNote() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    const navigate = useNavigate();

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink('');
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag('');
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {
        if (!title) {
            return alert('Título vazio!');
        }

        if (newLink) {
            return alert(
                'Existe conteúdo não adicionado no Link. Clique para adicionar ou deixe-o vazio!'
            );
        }

        if (newTag) {
            return alert(
                'Existe conteúdo não adicionado na Tag. Clique para adicionar ou deixe-o vazio!'
            );
        }

        await api.post('/notes', {
            title,
            description,
            links,
            tags
        });

        alert('Nota criada com sucesso!');

        handleBack();
    }

    function handleBack() {
        navigate(-1);
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="voltar" onClick={handleBack} />
                    </header>
                    <Input
                        placeholder="Título"
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextArea
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">
                        {links.map((link, index) => {
                            return (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            );
                        })}
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {tags.map((tag, index) => {
                                return (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                );
                            })}
                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                value={newTag}
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button title="Salvar" onClick={handleNewNote} />
                </Form>
            </main>
        </Container>
    );
}
