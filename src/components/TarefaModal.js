import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function TarefaModal({ visible, tarefa, onSave, onClose, loading }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);

  const isEditing = !!tarefa;

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || '');
      setDescricao(tarefa.descricao || '');
      setConcluida(tarefa.concluida || false);
    } else {
      setTitulo('');
      setDescricao('');
      setConcluida(false);
    }
  }, [tarefa, visible]);

  function handleSave() {
    if (!titulo.trim()) return;
    onSave({ titulo: titulo.trim(), descricao: descricao.trim(), concluida });
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.wrapper}
        >
          <View style={styles.sheet}>
            {/* Handle bar */}
            <View style={styles.handle} />

            <Text style={styles.title}>
              {isEditing ? '✏️  Editar Tarefa' : '➕  Nova Tarefa'}
            </Text>

            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Ex: Estudar React Native"
              placeholderTextColor={COLORS.textLight}
              value={titulo}
              onChangeText={setTitulo}
              maxLength={80}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[globalStyles.input, styles.textarea]}
              placeholder="Descreva a tarefa (opcional)"
              placeholderTextColor={COLORS.textLight}
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <View style={styles.switchRow}>
              <Text style={styles.label}>Marcar como concluída</Text>
              <Switch
                value={concluida}
                onValueChange={setConcluida}
                trackColor={{ false: COLORS.border, true: COLORS.success }}
                thumbColor={concluida ? '#fff' : '#fff'}
              />
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.btnCancel} onPress={onClose} activeOpacity={0.8}>
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.btnPrimary, styles.btnSave, !titulo.trim() && styles.btnDisabled]}
                onPress={handleSave}
                disabled={!titulo.trim() || loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={globalStyles.btnPrimaryText}>
                    {isEditing ? 'Salvar' : 'Criar'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(44,44,60,0.45)',
    justifyContent: 'flex-end',
  },
  wrapper: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textarea: {
    height: 80,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  btnCancel: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnCancelText: {
    color: COLORS.textLight,
    fontWeight: '600',
    fontSize: 15,
  },
  btnSave: {
    flex: 1,
  },
  btnDisabled: {
    opacity: 0.45,
  },
});
