import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function TarefaCard({ tarefa, onEdit, onDelete, onToggle }) {
  return (
    <View style={[styles.card, tarefa.concluida && styles.cardConcluida]}>
      {/* Badge status */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.badge, tarefa.concluida ? styles.badgeConcluida : styles.badgePendente]}
          onPress={() => onToggle(tarefa)}
          activeOpacity={0.7}
        >
          <Text style={[styles.badgeText, tarefa.concluida ? styles.badgeTextConcluida : styles.badgeTextPendente]}>
            {tarefa.concluida ? '✓ Concluída' : '○ Pendente'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.idText}>#{tarefa.id}</Text>
      </View>

      {/* Conteúdo */}
      <Text style={[styles.titulo, tarefa.concluida && styles.tituloRiscado]} numberOfLines={1}>
        {tarefa.titulo}
      </Text>
      {tarefa.descricao ? (
        <Text style={styles.descricao} numberOfLines={2}>
          {tarefa.descricao}
        </Text>
      ) : null}

      {/* Ações */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => onEdit(tarefa)} activeOpacity={0.8}>
          <Text style={styles.btnEditText}>✏️  Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => onDelete(tarefa.id)} activeOpacity={0.8}>
          <Text style={styles.btnDeleteText}>🗑️  Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardConcluida: {
    borderLeftColor: COLORS.success,
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgePendente: {
    backgroundColor: '#EDEDFF',
  },
  badgeConcluida: {
    backgroundColor: COLORS.concluida,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextPendente: {
    color: COLORS.primary,
  },
  badgeTextConcluida: {
    color: COLORS.concluidaText,
  },
  idText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  tituloRiscado: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  descricao: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnEdit: {
    flex: 1,
    backgroundColor: '#EDEDFF',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnEditText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  btnDelete: {
    flex: 1,
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnDeleteText: {
    color: COLORS.danger,
    fontWeight: '600',
    fontSize: 13,
  },
});
